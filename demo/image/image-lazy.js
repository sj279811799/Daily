/**
 * 使用IntersectionObserver监听页面中的图片
 */
const observer = new IntersectionObserver((entries)=>{  
    // entries是所有被监听对象的集合  
    entries.forEach(entry => {    
        if(entry.isIntersecting){      
            // 当被监听元素到临界值且未加载图片时触发。      
            !entry.target.isLoaded  && showImage(entry.target,entry.target.data_src); 
        }  
    });
});

/**
 * 加载图片
 * @param {*} el 
 * @param {*} imgSrc 
 */
function showImage(el, imgSrc){  
    const img = new Image();  
    img.src = imgSrc;  
    img.onload = ()=> {    
        el.src = imgSrc;    
        el.isLoaded = true;
    }
}
