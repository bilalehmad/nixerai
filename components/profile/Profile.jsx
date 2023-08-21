import PromptCard from '../prompt/PromptCard'

const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  return (
    <div class="p-4 sm:ml-64 w-full h-screen">
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>{name} Profile </span>
        </h1>
        <p className='desc text-left'>{desc}</p>

        <div className='mt-10 prompt_layout'>
        {/* {data.map((post) => (
            <PromptCard 
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
            />
        ))} */}
        </div>
    </div>
  )
}

export default Profile;