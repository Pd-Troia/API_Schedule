const isDev = (funct) =>{         
    if(process.env.ISDEV == 'true'){
        return (res,req,next)=>{next()}    
    }else{
        return funct
    }
}

module.exports = isDev