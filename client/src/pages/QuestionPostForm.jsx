import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/QuestionPostForm.css'

const QuestionPostForm = () => {
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector(state => state.questions) // optional

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    const newQuestion = {
      title,
      description
    }

    // Dispatch your action (you can create createQuestion(newQuestion))
    // dispatch(createQuestion(newQuestion))

    console.log('Submitted:', newQuestion) // temp for test
  }

  return (
    <form className='question-form' onSubmit={handleSubmit}>
      <h2>Ask a Question</h2>

      <input
        type='text'
        name='title'
        placeholder='Question title...'
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <ReactQuill
        value={description}
        onChange={setDescription}
        placeholder='Describe your question in detail...'
      />

      <button type='submit' disabled={loading}>
        {loading ? 'Posting...' : 'Post Question'}
      </button>

      {error && <p className='error-text'>{error}</p>}
      {success && <p className='success-text'>Question posted!</p>}
    </form>
  )
}

export default QuestionPostForm
