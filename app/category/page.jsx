
import PromptCategoryList from '@components/category/PromptCategoryList';

export const revalidate = 0;

const fetchCategory = async () => {
    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/category`);
      const category = await response.json();
      return category;
      
    } catch (error) {
      console.log("Error on Fetching Post", error)
      
    }
  }
const CategoriesList = async() => {
    const category = await fetchCategory();

  return (
    
    <section className="w-full h-screen flex-center flex-col max-w-7xl sm:px-6 px-6 mt-10">
        <PromptCategoryList data={category} />
    </section>
  )
}

export default CategoriesList