import {
  render,
  screen,
  fireEvent,
  waitFor,
  within
} from '@testing-library/react'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import { vi } from 'vitest'

// ---------------- MOCK AXIOS CLIENT ----------------
vi.mock('~/plugins/axiosClient', () => ({
  axiosClient: {
    get: vi.fn()
  }
}))
import { axiosClient } from '~/plugins/axiosClient'

// ---------------- MOCK StepContext ----------------
vi.mock('~/context/step-context', () => ({
  useStepContext: vi.fn()
}))
import { useStepContext } from '~/context/step-context'

const mockHandleStepData = vi.fn()

useStepContext.mockReturnValue({
  stepData: {},
  handleStepData: mockHandleStepData
})

const renderStep = () =>
  render(<GeneralInfoStep btnsBox={<button>Next</button>} />)

describe('GeneralInfoStep', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    axiosClient.get.mockResolvedValue({ data: [] })
  })

  // ---------------- VALIDATION ----------------
  it('validates empty first name', async () => {
    renderStep()

    const firstNameInput = screen.getAllByRole('textbox')[0]
    fireEvent.change(firstNameInput, { target: { value: '' } })

    fireEvent.click(screen.getByText(/next/i))

    const errors = screen.getAllByText(/cannot be empty/i)
    expect(errors.length).toBeGreaterThan(0)
  })

  it('validates incorrect name format', () => {
    renderStep()

    const firstNameInput = screen.getAllByRole('textbox')[0]
    fireEvent.change(firstNameInput, { target: { value: '1234' } })

    fireEvent.click(screen.getByText(/next/i))

    expect(screen.getByText(/alphabetic characters only/i)).toBeInTheDocument()
  })

  it('validates status length > 200 characters', () => {
    renderStep()

    const statusInput = screen.getAllByRole('textbox')[2]
    const longText = 'a'.repeat(201)

    fireEvent.change(statusInput, { target: { value: longText } })
    fireEvent.click(screen.getByText(/next/i))

    expect(screen.getByText(/too long/i)).toBeInTheDocument()
  })

  // ---------------- API: COUNTRIES ----------------
  it('loads countries on mount', async () => {
    axiosClient.get.mockResolvedValueOnce({
      data: [{ name: 'Ukraine', iso2: 'UA' }]
    })

    renderStep()

    await waitFor(() => expect(axiosClient.get).toHaveBeenCalledTimes(1))
  })

  it('handles API error when loading countries', async () => {
    axiosClient.get.mockRejectedValueOnce(new Error('Network error'))

    renderStep()

    await waitFor(() => expect(axiosClient.get).toHaveBeenCalled())
  })

  it('renders empty country list when API returns empty array', async () => {
    axiosClient.get.mockResolvedValueOnce({ data: [] })

    renderStep()

    await waitFor(() => expect(axiosClient.get).toHaveBeenCalled())

    const countrySelect = screen.getAllByRole('combobox')[0]
    fireEvent.mouseDown(countrySelect)

    expect(screen.queryByRole('option')).not.toBeInTheDocument()
  })

  // ---------------- API: STATES ----------------
  it('loads states when country selected', async () => {
    axiosClient.get
      .mockResolvedValueOnce({
        data: [{ name: 'Ukraine', iso2: 'UA' }]
      })
      .mockResolvedValueOnce({
        data: [{ name: 'Kyiv Oblast', iso2: 'KO' }]
      })

    renderStep()

    await waitFor(() => expect(axiosClient.get).toHaveBeenCalledTimes(1))

    const countrySelect = screen.getAllByRole('combobox')[0]
    fireEvent.mouseDown(countrySelect)
    fireEvent.click(await screen.findByText('Ukraine'))

    await waitFor(() => expect(axiosClient.get).toHaveBeenCalledTimes(2))
  })

  // ---------------- API: CITIES ----------------
  it('loads cities when state selected', async () => {
    axiosClient.get
      .mockResolvedValueOnce({
        data: [{ name: 'Ukraine', iso2: 'UA' }]
      })
      .mockResolvedValueOnce({
        data: [{ name: 'Kyiv Oblast', iso2: 'KO' }]
      })
      .mockResolvedValueOnce({
        data: [{ name: 'Kyiv' }]
      })

    renderStep()

    await waitFor(() => expect(axiosClient.get).toHaveBeenCalledTimes(1))

    const countrySelect = screen.getAllByRole('combobox')[0]
    fireEvent.mouseDown(countrySelect)
    fireEvent.click(await screen.findByText('Ukraine'))

    await waitFor(() => expect(axiosClient.get).toHaveBeenCalledTimes(2))

    const stateSelect = screen.getAllByRole('combobox')[1]
    fireEvent.mouseDown(stateSelect)
    fireEvent.click(await screen.findByText('Kyiv Oblast'))

    await waitFor(() => expect(axiosClient.get).toHaveBeenCalledTimes(3))
  })

  // ---------------- STALE RESPONSE ----------------
  it('ignores stale city responses when state changes quickly', async () => {
    axiosClient.get.mockResolvedValueOnce({
      data: [{ name: 'Ukraine', iso2: 'UA' }]
    })

    axiosClient.get.mockResolvedValueOnce({
      data: [
        { name: 'Kyiv Oblast', iso2: 'KO' },
        { name: 'Lviv Oblast', iso2: 'LO' }
      ]
    })

    let resolveKyivCities
    let resolveLvivCities

    axiosClient.get.mockImplementationOnce(
      () =>
        new Promise((res) => {
          resolveKyivCities = res
        })
    )

    axiosClient.get.mockImplementationOnce(
      () =>
        new Promise((res) => {
          resolveLvivCities = res
        })
    )

    renderStep()

    await waitFor(() => expect(axiosClient.get).toHaveBeenCalledTimes(1))

    const countrySelect = screen.getAllByRole('combobox')[0]
    fireEvent.mouseDown(countrySelect)
    fireEvent.click(await screen.findByText('Ukraine'))

    await waitFor(() => expect(axiosClient.get).toHaveBeenCalledTimes(2))

    const stateSelect = screen.getAllByRole('combobox')[1]
    fireEvent.mouseDown(stateSelect)
    fireEvent.click(await screen.findByText('Kyiv Oblast'))

    fireEvent.mouseDown(stateSelect)
    fireEvent.click(await screen.findByText('Lviv Oblast'))

    resolveKyivCities({ data: [{ name: 'Kyiv' }] })
    resolveLvivCities({ data: [{ name: 'Lviv' }] })

    const citySelect = screen.getByTestId('city-select')
    fireEvent.mouseDown(citySelect)

    const lvivOption = await within(document.body).findByText(/lviv/i)
    expect(lvivOption).toBeInTheDocument()

    expect(within(document.body).queryByText(/kyiv/i)).not.toBeInTheDocument()
  })
})
