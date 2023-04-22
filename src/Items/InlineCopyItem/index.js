import { Alert, Box, Snackbar } from '@mui/material'
import { useState } from 'react'

const InlineCopyItem = ({text}) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
      setOpen(true)
      navigator.clipboard.writeText(text)
    }
    
    return (
        <>
          <Box component="div" 
            onClick={handleClick}
            sx={{ 
                display: 'inline',
                p: 1,
                bgcolor: '#222',
                color: 'grey.100',
                border: '1px solid',
                borderColor: 'grey.500',
                borderRadius: 2,
                fontSize: '0.875rem',
                cursor: 'pointer',
            }}>{text}</Box>

          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={2000}
          >
            <Alert severity="success" sx={{ width: '100%' }}>
              {`Copied '${text}' to clipboard`}
            </Alert>
          </Snackbar>
        </>
    )
}

export default InlineCopyItem