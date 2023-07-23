import Link from 'next/link'

const Form = ({type, data, setPost, submitting, handleSubmit}) => {
  const post = data;
  return (
    <section className='w-full max-w-full flex flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>

      <p className='desc text-left max-w-md'>
        {type} and Share amazing prompts with the world, and let your imagination run with any AI-Powered Platform.
      </p>

      <form 
        onSubmit={handleSubmit}
        className='mt-10 w-full grid sm:grid-cols-2 gap-7 glassmorphism'
        >
          <label>
            <span className='font-staoshi font-semibold text-base text-white'>
              Title
            </span>

            <input 
              value={post.title}
              onChange={(e) => setPost({
                ...post,
                title: e.target.value
              })}
              placeholder='Write your Title Here...'
              required
              className='form_input'
            />

          </label>

          <label>
            <span className='font-staoshi font-semibold text-base text-white'>
            Teasor
            </span>

            <textarea 
              value={post.teasor}
              onChange={(e) => setPost({
                ...post,
                teasor: e.target.value
              })}
              placeholder='Write your Teasor Here...'
              required
              className='form_textarea'
              >
  
              </textarea>

          </label>
          <label>
            <span className='font-staoshi font-semibold text-base text-white'>
            Sample
            </span>

            <textarea 
              value={post.sample}
              onChange={(e) => setPost({
                ...post,
                sample: e.target.value
              })}
              placeholder='Write your prompt Here...'
              required
              className='form_textarea'
            >

            </textarea>
          </label>
          
          <label>
            <span className='font-staoshi font-semibold text-base text-white'>
            Example
            </span>

            <textarea 
              value={post.example}
              onChange={(e) => setPost({
                ...post,
                example: e.target.value
              })}
              placeholder='Write your prompt Here...'
              required
              className='form_textarea'
            >

            </textarea>
          </label>

          <label>
            <span className='font-staoshi font-semibold text-base text-white'>
              Output 1
            </span>

            <textarea 
              value={post.output1}
              onChange={(e) => setPost({
                ...post,
                output1: e.target.value
              })}
              placeholder='Write your prompt Here...'
              required
              className='form_textarea'
            >

            </textarea>
          </label>


          <label>
            <span className='font-staoshi font-semibold text-base text-white'>
            Output 2
            </span>

            <textarea 
              value={post.output2}
              onChange={(e) => setPost({
                ...post,
                output2: e.target.value
              })}
              placeholder='Write your prompt Here...'
              required
              className='form_textarea'
            >

            </textarea>
          </label>

          <label>
            <span className='font-staoshi font-semibold text-base text-white'>
            Status
            </span>

            <select 
              value={post.status}
              onChange={(e) => setPost({
                ...post,
                status: e.target.value
              })}
              placeholder='Write your prompt Here...'
              required
              className='form_input'
            >
            <option value=''>--Select Staus--</option>
              <option value='New'>New</option>
              <option value='Verified'>Verified</option>
              <option value='Popular'>Popular</option>
            </select>
          </label>


          


          <label>
            <span className='font-staoshi font-semibold text-base text-white'>
              Image {` `}
              <span className='font-normal'>(Paste A URL)</span>
            </span>

            <input 
              value={post.image}
              onChange={(e) => setPost({
                ...post,
                image: e.target.value
              })}
              placeholder='#tag'
              required
              className='form_input'
            />

          </label>

          <label>
            <span className='font-staoshi font-semibold text-base text-white'>
              Tag {` `}
              <span className='font-normal'>(#product, #webdevelopent, #idea)</span>
            </span>

            <input 
              value={post.tag}
              onChange={(e) => setPost({
                ...post,
                tag: e.target.value
              })}
              placeholder='#tag'
              required
              className='form_input'
            />

          </label>

          <div className='flex-end mx-3 mb-5 gap-4' >
            <Link href='/' className='text-gray-500 text-sm'>
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

export default Form