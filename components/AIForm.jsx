import Link from 'next/link'
import Image from 'next/image'

const AIForm = ({type, post, setPost, submitting, handleSubmit, handleImage, image}) => {

  return (
    <section className='w-full flex flex-col max-w-7xl sm:px-6 px-6'>
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
            URL
          </span>

          <input 
            value={post.url}
            onChange={(e) => setPost({
              ...post,
              url: e.target.value
            })}
            placeholder='Paste your URL Here...'
            required
            className='form_input'
          />

        </label>
        
        <label>
          <span className='font-staoshi font-semibold text-base text-white'>
            Accessibility
          </span>

          <input 
            value={post.accessibility}
            onChange={(e) => setPost({
              ...post,
              accessibility: e.target.value
            })}
            placeholder='Write Site Accessibility Like Free or Paid'
            required
            className='form_input'
          />

        </label>


        <label>
          <span className='font-staoshi font-semibold text-base text-white'>
            Star
          </span>

          <input 
            value={post.star}
            onChange={(e) => setPost({
              ...post,
              star: e.target.value
            })}
            type = "number"
            placeholder='Write your Star in Number Here...'
            className='form_input'
          />

        </label>

        <label>
          <span className='font-staoshi font-semibold text-base text-white'>
            Youtube URL
          </span>

          <input 
            value={post.youtubeUrl}
            onChange={(e) => setPost({
              ...post,
              youtubeUrl: e.target.value
            })}
            placeholder='Paste your URL Here...'
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
        
        
        <label>
          <span className='font-staoshi font-semibold text-base text-white'>
            Image
          </span>

          <input 
            value={post.image}
            onChange={handleImage}
            type="file"
            placeholder='Upload your Image   Here...'
            required
            className='form_input'
            accept="image/*"
          />
          {image && 
                <Image src={image} width={100} height={100} alt='Image For AI Tool' />
          }
        </label>

        
        <label>
          <span className='font-staoshi font-semibold text-base text-white'>
          Description
          </span>

          <textarea 
            value={post.description}
            onChange={(e) => setPost({
              ...post,
              description: e.target.value
            })}
            placeholder='Write your Description Here...'
            required
            className='form_textarea'
            >

            </textarea>

        </label>

        <div className='flex-end mx-3 mb-5 gap-4' >
          <Link href='/' className='text-white text-sm'>
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

export default AIForm