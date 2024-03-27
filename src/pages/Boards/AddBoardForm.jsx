import { useForm } from 'react-hook-form'
import { Box, Button, Dialog, DialogActions, DialogContent, FormControl, TextField } from '@mui/material'
import { useAddNewBoardMutation } from '../../redux/boardsSlice'

export const AddBoardForm = ({ isModalOpen, onClose }) => {
  const [addNewBoard, { isLoading }] = useAddNewBoardMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSaveClicked = async (data) => {
    const canSave = [data.name].every(Boolean) && !isLoading

    if (canSave) {
      try {
        await addNewBoard({ name }).unwrap()
      } catch (e) {
        console.error('Failed to save the board: ', e.data.error)
      }
    }

    onClose()
  }

  return (
    <>
      <Dialog open={isModalOpen} fullWidth={'lg'} maxWidth={'lg'}>
        <div className='dialog-header'>
          <Box>
            <Button onClick={onClose} variant='outlined' color='error' type='submit'>
              X
            </Button>
          </Box>
        </div>

        <form onSubmit={handleSubmit(onSaveClicked)}>
          <div className='input-group'>
            <DialogContent className='expand-input'>
              <FormControl variant='outlined'>
                <TextField
                  {...register('name', {
                    required: 'Name is required',
                  })}
                  error={Boolean(errors.name)}
                  helperText={Boolean(errors.name) && errors.name.message}
                  id='name'
                  name='name'
                  type='text'
                  label='NAME *'
                  variant='outlined'
                  margin='normal'
                />
              </FormControl>
            </DialogContent>
          </div>
          <DialogActions>
            <Button variant='outlined' color='info' type='submit'>
              + Add Product
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
