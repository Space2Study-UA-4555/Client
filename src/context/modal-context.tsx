import {
  FC,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import PopupDialog from '~/components/popup-dialog/PopupDialog'
import { PaperProps } from '@mui/material/Paper'

interface Component {
  component: React.ReactElement
  paperProps?: PaperProps
  hideCloseIcon?: boolean
}

interface ModalProvideContext {
  openModal: (component: Component, delayToClose?: number) => void
  closeModal: () => void
}

interface ModalProviderProps {
  children: React.ReactElement
}

const ModalContext = createContext<ModalProvideContext>(
  {} as ModalProvideContext
)

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modal, setModal] = useState<React.ReactElement | null>(null)
  const [paperProps, setPaperProps] = useState<PaperProps>({})
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [hideCloseIcon, setHideCloseIcon] = useState<boolean>(false)

  const closeModal = useCallback(() => {
    setModal(null)
    setPaperProps({})
    setTimer(null)
    setHideCloseIcon(false)
  }, [setModal, setPaperProps, setTimer, setHideCloseIcon])

  const closeModalAfterDelay = useCallback(
    (delay?: number) => {
      const timerId = setTimeout(closeModal, delay ?? 5000)
      setTimer(timerId)
    },
    [closeModal]
  )

  const openModal = useCallback(
    (
      { component, paperProps, hideCloseIcon }: Component,
      delayToClose?: number
    ) => {
      setModal(component)
      setHideCloseIcon(Boolean(hideCloseIcon))

      paperProps && setPaperProps(paperProps)
      delayToClose && closeModalAfterDelay(delayToClose)
    },
    [setModal, setPaperProps, setHideCloseIcon, closeModalAfterDelay]
  )

  const contextValue = useMemo(
    () => ({ openModal, closeModal }),
    [closeModal, openModal]
  )

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modal && (
        <PopupDialog
          closeModal={closeModal}
          closeModalAfterDelay={closeModalAfterDelay}
          content={modal}
          hideCloseIcon={hideCloseIcon}
          paperProps={paperProps}
          timerId={timer}
        />
      )}
    </ModalContext.Provider>
  )
}

const useModalContext = () => useContext(ModalContext)

export { ModalProvider, useModalContext }
