import React, { Component } from 'react';
import './Home.css'
import Display from'../Books/Books';
import Search from '../Search/Search'

var x;//whenever the option of the books is changing this x holds that book.
//Parent component for books and search component
export default class Home extends Component{
       constructor(props){
           super(props);
           this.state={reading:"",   //initially seatting empty
                       likes:"",
                       dislikes:"",
                       isrender:""    //decides which component to render ie(home or search)
                    }
       }
       componentDidMount(){     //geting the details of books from api
        fetch("https://reactnd-books-api.udacity.com/books", {
            headers: {
              Authorization: "you"
            }
          }).then(res => res.json()).then(res => {
            //Initially I put 3 books in each section  
            var readingg=res.books.slice(0,3);
            var likess=res.books.slice(3,6);
            var dislikess=res.books.slice(6,9)
            console.log(res.books)
            //once we got response from api we set the response as a state
            this.setState({reading:readingg,likes:likess,dislikes:dislikess,isrender:"home"})
          });
    }
      
    next=()=>{ //once the search button is clicked we have to render the seach component
          this.setState({isrender:"search"})
    }

    search=(e,val)=>{ //this function is used when user select the options from search result
        console.log(this.state.reading)
         var read=this.state.reading;
         var like=this.state.likes;
         var dislike=this.state.dislikes;
          if(e.target.value==="reading"){
              read.push(val)
              this.setState({reading:read,isrender:"home"})
          }
          else if(e.target.value==="likes"){
              like.push(val)
            this.setState({likes:like,isrender:"home"})
          }
          else if(e.target.value==="dislikes"){
              dislike.push(val)
          this.setState({dislike:dislike,isrender:"home"})
          }
    }

    changeHandler=(e,type,position)=>{//this function is used when user select options from any one of the section
        //purpose of this function is pop the book from current section and put into new selected section
        var read=this.state.reading;
        var like=this.state.likes;
        var dislike=this.state.dislikes;
    if(type==="reading"){
            if(e.target.value==="likes"){
                x=read.splice(position,1)
                x.forEach(val=>like.push(val))
            }
            else if(e.target.value==="dislikes"){
                x=read.splice(position,1)
                x.forEach(val=>dislike.push(val))
            }
            else if(e.target.value==="delete"){
                read.splice(position,1)
            }
    }
    else if(type==="likes"){
        if(e.target.value==="reading"){
            x=like.splice(position,1)
            x.forEach(val=>read.push(val))
        }
        else if(e.target.value==="dislikes"){
            x=like.splice(position,1)
            x.forEach(val=>dislike.push(val))
        }
        else if(e.target.value==="delete"){
            like.splice(position,1)
        }
    }
    else if(type==="dislikes"){
        if(e.target.value==="reading"){
            x=dislike.splice(position,1)
            x.forEach(val=>read.push(val))
        }
        else if(e.target.value==="likes"){
            x=dislike.splice(position,1)
            x.forEach(val=>like.push(val))
        }
        else if(e.target.value==="delete"){
            dislike.splice(position,1)
        }
    }
    this.setState({reading:read,
                   likes:like,
                   dislikes:dislike
                })
   }

   render(){
       console.log(this.state)
       
       return(
           <div>
           {this.state.isrender ==="home" &&
            <>
            
           <div className="lists">
               <h1>Reading</h1>
                   <Display items={this.state.reading} value="reading" change={this.changeHandler}/>
           </div>

           <div className="lists">
               <h1>Likes</h1>
                   <Display items={this.state.likes} value="likes" change={this.changeHandler}/>
           </div>

           <div className="lists">
               <h1>Dislikes</h1>
                 <Display items={this.state.dislikes} value="dislikes" change={this.changeHandler}/>
           </div>
           <button id="nav" onClick={this.next}>+</button>
           </>}

            { this.state.isrender==="search"&&
           <Search lists={this.state} change={this.search}/>
            }
           </div>
       )
}
}