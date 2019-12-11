export default (props) => {    
    const { AccessoriesData, selectedSubCategoryId } = props;
    const subCategoryData = AccessoriesData.subcategory.subCategories;
    return (
        <div className="sliderMobile mb-4 px-2" style={{ 'whiteSpace': 'nowrap' }}>
            <div onClick={() => props.handleClick(0, subCategoryData[0].accessoryCategory.id)} className={"d-inline-block px-3 py-1 mx-1 border rounded " + (selectedSubCategoryId == 0 ? "border-primary bg-primary text-white" : "border-gray80")}>
                <div><h4 className="title-section m-0">All</h4></div>
            </div>
            {subCategoryData.map((item, index) => (
                <div key={index} onClick={() => props.handleClick(item.id)} className={"d-inline-block px-3 py-1 mx-1 border rounded " + (selectedSubCategoryId == item.id ? "border-primary bg-primary text-white" : "border-gray80")}>
                    <div><h4 className="title-section m-0">{item.title}</h4></div>
                </div>
            ))}
        </div>
    )
}