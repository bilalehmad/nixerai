import Link from 'next/link'

const CategoryForm = ({type, data, setPost, submitting, handleSubmit}) => {
  const post = data;

  return (
    <section className='w-full max-w-full flex flex-col'>
    <h1 className='head_text text-left'>
      <span className='blue_gradient'>{type} Category</span>
    </h1>

    <form 
      onSubmit={handleSubmit}
      className='mt-10 w-full grid sm:grid-cols-2 gap-7 glassmorphism'
      >
        <label>
          <span className='font-staoshi font-semibold text-base text-gray-700 dark:text-white'>
            Name
          </span>

          <input 
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder='Write your Category Name Here...'
            required
            className='form_input'
          />

        </label>

        <div className='flex-end mx-3 mb-5 gap-4' >
          <Link href='/' className=' bg-gray-400 px-5 py-1.5 rounded-full text-white text-sm'>
              Cancel
          </Link>
          <button
            type='submit'
            disabled = {submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
  </section>
  )
}

export default CategoryForm