import React, { Component } from 'react'

export class NewsItem extends Component {
   
    render() {
        let { title, urlToImage, pubAt ,url,source,author } = this.props
        const mystyle={
            
            
            backgroundColor:"red",
            width:"145px",
            borderRadius:"17px",
            textAlign:"center",
            color:"white"

        }
        let sourceName = (Array.isArray(source.name) && source.name.length === 1 && source.name[0] === "Removed") ? "Unknown" : source.name;
        const newStyle={
            display:"flex",
            justifyContent:"flex-end",
            position:"absolute",
            right:"0"
        }
        return (
            <>

                <div className="card h-100 z-n1">
                    <div>
                        <img src={!urlToImage? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1jVdct5HeY9t0N1WxpkApKo4_akcPx972mQ&s": urlToImage} alt="news image" className='img-fluid card-img-top' style={{height:"200px",objectFit:"cover"}}  />
                    </div>
                    <div style={newStyle}>
                    <p style={mystyle} ><strong> {sourceName}</strong></p>
                    </div>
                    <div className="card-body">
                        <p className='mx-0'>By <strong>{!author? "Unknown" : author}</strong> on {new Date(pubAt).toGMTString()}</p>
                       
                        <div className="card-title  fw-bold">
                            {title}
                        </div>
                     <a href={url} className='stretched-link'></a>

                    </div>
                  
                  
                </div>

            </>
        )
    }
}

export default NewsItem
