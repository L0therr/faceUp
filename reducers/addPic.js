export default function(picList=[], action) {
    if(action.type == 'addPic') {
      var newPic = [...picList];
      newPic.push(action.toAdd);
      return newPic;
    } else {
      return picList;
    }
  }