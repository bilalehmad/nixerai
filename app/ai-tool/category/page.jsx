
import ToolCategoryList from '@components/category/ToolCategoryList';

export const revalidate = 0;

const fetchCategory = async () => {
    try {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/aicategory`);
      const category = await response.json();
      return category;
      
    } catch (error) {
      console.log("Error on Fetching Post", error)
      
    }
  }
const CategoriesList = async() => {
    const category = await fetchCategory();

  return (
    
    <section className="w-full flex-center flex-col max-w-7xl sm:px-6 px-6 mt-24">
        <ToolCategoryList data={category} />
    </section>
  )
}

export default CategoriesList