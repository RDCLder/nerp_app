const initialState = {
    data: []
  };
  
  const secondReducer = (state = initialState, action) => {
    switch (action.type) {
      case "":
        return {
  
        };
      default:
        return state;
    }
  };
  
  export default secondReducer;