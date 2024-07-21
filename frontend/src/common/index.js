


const backendDomain = "http://localhost:8080";


const SummaryApi = {
    signUP: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUsers: {
        url: `${backendDomain}/api/all-user`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "put"
    },
    DeleteUser:{
          url:`${backendDomain}/api/delete-user`,
          method :"DELETE"
    },

    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post",
    },
    allproduct: {
        url: `${backendDomain}/api/get-product`,
        method: "get",
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "put"
    },
    productCategory: {
        url: `${backendDomain}/api/get-ProductCategory`,
        method: "get"
    },
    categorywiseproduct: {
        url: `${backendDomain}/api/category-product`,
        method: "post"
    },
    productDetail: {
        url: `${backendDomain}/api/product-details`,
        method :"post"
    },
    addToCart:{
        url: `${backendDomain}/api/add-to-cart`,
        method :"post"
    },
    countcart:{
      url:`${backendDomain}/api/countAddToCart`,
      method:"get"
    },
      addToCartVeiw:{
        url:`${backendDomain}/api/view-cart-product`,
        method:"get"
      },
      updateCartProduct:{
        url:`${backendDomain}/api/update-cartProduct`,
        method:"put"
      },
      deleteCartProduct:{
        url:`${backendDomain}/api/delete-cart`,
        method:"delete"
      },
      searchProduct:{
        url:`${backendDomain}/api/search`,
        method:"get"
      }


};

export default SummaryApi;
