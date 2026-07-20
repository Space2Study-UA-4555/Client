export const styles = {
  dragAndDrop: {
    root: {
      width: '100%'
    },
    uploadBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      aspectRatio: '1',
      border: '2px dashed',
      borderColor: 'primary.200',
      borderRadius: '20px',
      overflow: 'hidden'
    },
    activeDrag: {
      borderColor: 'primary.900',
      backgroundColor: 'basic.grey'
    }
  },
  mobilePreview: {
    display: { xs: 'block', sm: 'none' }
  },
  previewImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '20px'
  },
  placeholder: {
    typography: 'body2',
    color: 'primary.500'
  },
  fileUploader: {
    button: {
      width: '100%',
      textAlign: 'center'
    },
    root: {
      width: '100%'
    }
  }
}
