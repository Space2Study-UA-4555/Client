import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import * as api from '~/services/locationApi'
import useSteps from '~/hooks/use-steps'
import { vi } from 'vitest'

vi.mock('~/services/locationApi')
vi.mock('~/hooks/use-steps')

const mockNext = vi.fn()
const mockSetStepError = vi.fn()

useSteps.mockReturnValue({
  stepOperation: { next: mockNext },
  activeStep: 0,
  setStepError: mockSetStepError
})

describe('GeneralInfoStep', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ---------------- BASIC RENDER ----------------
  it('renders all fields', () => {
    render(<GeneralInfoStep btnsBox={<button>Next</button>} />)

    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Last name/i)).toBeInTheDocument()
    expect(screen.getByText(/Select country/i)).toBeInTheDocument()
    expect(screen.getByText(/Select city/i)).toBeInTheDocument()
    expect(
      screen.getByText(/Describe in short your professional status/i)
    ).toBeInTheDocument()
  })

  // ---------------- VALIDATION ----------------
  it('validates empty first name', () => {
    render(<GeneralInfoStep btnsBox={<button>Next</button>} />)

    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: '' }
    })

    fireEvent.click(screen.getByText(/Next/i))

    expect(screen.getByText(/cannot be empty/i)).toBeInTheDocument()
    expect(mockSetStepError).toHaveBeenCalledWith(0, true)
  })

  it('validates incorrect name format', () => {
    render(<GeneralInfoStep btnsBox={<button>Next</button>} />)

    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: '1234' }
    })

    fireEvent.click(screen.getByText(/Next/i))

    expect(screen.getByText(/alphabetic characters only/i)).toBeInTheDocument()
  })

  it('validates status length > 200 characters', () => {
    render(<GeneralInfoStep btnsBox={<button>Next</button>} />)

    const longText = 'a'.repeat(201)

    fireEvent.change(
      screen.getByText(/Describe in short your professional status/i),
      { target: { value: longText } }
    )

    expect(screen.getByText(/Too long/i)).toBeInTheDocument()
    expect(mockSetStepError).toHaveBeenCalledWith(0, true)
  })

  // ---------------- API: COUNTRIES ----------------
  it('loads countries on mount', async () => {
    api.getCountries.mockResolvedValue({
      data: [{ name: 'Ukraine', iso2: 'UA' }]
    })

    render(<GeneralInfoStep btnsBox={<button>Next</button>} />)

    await waitFor(() => expect(api.getCountries).toHaveBeenCalledTimes(1))
  })

  it('handles API error when loading countries', async () => {
    api.getCountries.mockRejectedValue(new Error('Network error'))

    render(<GeneralInfoStep btnsBox={<button>Next</button>} />)

    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument()

    await waitFor(() => {
      expect(api.getCountries).toHaveBeenCalled()
    })
  })

  it('renders empty country list when API returns empty array', async () => {
    api.getCountries.mockResolvedValue({ data: [] })

    render(<GeneralInfoStep btnsBox={<button>Next</button>} />)

    await waitFor(() => expect(api.getCountries).toHaveBeenCalled())

    fireEvent.mouseDown(screen.getByText(/Select country/i))

    expect(screen.queryByRole('option')).not.toBeInTheDocument()
  })

  // ---------------- API: CITIES ----------------
  it('loads cities when country selected', async () => {
    api.getCountries.mockResolvedValue({
      data: [{ name: 'Ukraine', iso2: 'UA' }]
    })

    api.getCities.mockResolvedValue({
      data: [{ name: 'Kyiv' }]
    })

    render(<GeneralInfoStep btnsBox={<button>Next</button>} />)

    await waitFor(() => screen.getByText('Ukraine'))

    fireEvent.mouseDown(screen.getByText(/Select country/i))
    fireEvent.click(screen.getByText('Ukraine'))

    await waitFor(() => expect(api.getCities).toHaveBeenCalledWith('UA'))
  })

  it('handles API error when loading cities', async () => {
    api.getCountries.mockResolvedValue({
      data: [{ name: 'Ukraine', iso2: 'UA' }]
    })

    api.getCities.mockRejectedValue(new Error('Cities error'))

    render(<GeneralInfoStep btnsBox={<button>Next</button>} />)

    await waitFor(() => screen.getByText('Ukraine'))

    fireEvent.mouseDown(screen.getByText(/Select country/i))
    fireEvent.click(screen.getByText('Ukraine'))

    await waitFor(() => {
      expect(api.getCities).toHaveBeenCalledWith('UA')
    })
  })

  it('renders empty city list when API returns empty array', async () => {
    api.getCountries.mockResolvedValue({
      data: [{ name: 'Ukraine', iso2: 'UA' }]
    })

    api.getCities.mockResolvedValue({ data: [] })

    render(<GeneralInfoStep btnsBox={<button>Next</button>} />)

    await waitFor(() => screen.getByText('Ukraine'))

    fireEvent.mouseDown(screen.getByText(/Select country/i))
    fireEvent.click(screen.getByText('Ukraine'))

    await waitFor(() => expect(api.getCities).toHaveBeenCalled())

    fireEvent.mouseDown(screen.getByText(/Select city/i))

    expect(screen.queryByRole('option')).not.toBeInTheDocument()
  })

  // ---------------- UX LOGIC ----------------
  it('clears city when country changes', async () => {
    api.getCountries.mockResolvedValue({
      data: [
        { name: 'Ukraine', iso2: 'UA' },
        { name: 'Poland', iso2: 'PL' }
      ]
    })

    api.getCities.mockResolvedValue({ data: [{ name: 'Kyiv' }] })

    render(<GeneralInfoStep btnsBox={<button>Next</button>} />)

    await waitFor(() => screen.getByText('Ukraine'))

    fireEvent.mouseDown(screen.getByText(/Select country/i))
    fireEvent.click(screen.getByText('Ukraine'))

    await waitFor(() => screen.getByText('Kyiv'))

    fireEvent.mouseDown(screen.getByText(/Select city/i))
    fireEvent.click(screen.getByText('Kyiv'))

    fireEvent.mouseDown(screen.getByText(/Select country/i))
    fireEvent.click(screen.getByText('Poland'))

    expect(screen.getByText(/Select city/i)).toBeInTheDocument()
  })

  // ---------------- NEXT BUTTON ----------------
  it('calls next() when all fields valid', async () => {
    api.getCountries.mockResolvedValue({
      data: [{ name: 'Ukraine', iso2: 'UA' }]
    })

    api.getCities.mockResolvedValue({
      data: [{ name: 'Kyiv' }]
    })

    render(<GeneralInfoStep btnsBox={<button>Next</button>} />)

    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: 'Ivan' }
    })

    fireEvent.change(screen.getByLabelText(/Last name/i), {
      target: { value: 'Petrov' }
    })

    await waitFor(() => screen.getByText('Ukraine'))
    fireEvent.mouseDown(screen.getByText(/Select country/i))
    fireEvent.click(screen.getByText('Ukraine'))

    await waitFor(() => screen.getByText('Kyiv'))
    fireEvent.mouseDown(screen.getByText(/Select city/i))
    fireEvent.click(screen.getByText('Kyiv'))

    fireEvent.change(
      screen.getByText(/Describe in short your professional status/i),
      { target: { value: 'Teacher' } }
    )

    fireEvent.click(screen.getByText(/Next/i))

    expect(mockNext).toHaveBeenCalled()
    expect(mockSetStepError).toHaveBeenCalledWith(0, false)
  })
})
