const findName = name => category => category.id === name;
const categoryEdgesToList = categoryEdges =>
  categoryEdges.map(edge => edge.node);

class CategoryModel {
  static hasCategory(categoryEdges, categoryId) {
    const categoryList = categoryEdgesToList(categoryEdges);
    return Boolean(categoryList.find(findName(categoryId)));
  }

  static getCategory(categoryEdges, categoryId, fallbackId) {
    const categoryList = categoryEdgesToList(categoryEdges);
    if (this.hasCategory(categoryEdges, categoryId)) {
      return categoryList.find(findName(categoryId));
    }
    return categoryList.find(findName(fallbackId));
  }
}

export default CategoryModel;
