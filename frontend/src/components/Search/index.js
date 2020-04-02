import React, {Component} from 'react';
import "./Search.css"
import SearchIcon from '@material-ui/icons/Search';
import Chip from "@material-ui/core/Chip";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Api from "../../api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0,
      maxHeight: 0,
      search:"",
      contents: [],
      categories:[],
      tags: [],
    }
  }
  componentDidMount() {
    let searchCurtains = document.querySelector(".search-curtains")
    window.addEventListener("click",(e)=>{
      if(e.target === searchCurtains){
        this.setState({
          opacity: 0,
          maxHeight: 0
        })
      }
    })
  }

  async handleToggle(e) {

    await this.setState({
      search: e.target.value,
    });

    if (this.state.search.length > 1) {

      this.setState({
        opacity: 1,
        maxHeight: 5000
      })

      new Api().search(this.state.search, (window.location.href.match('blog')  ? 'blog' : 'site')).then((resp) => {
        if (typeof resp != "undefined") {
          this.setState({
            contents: resp.contents,
            categories: resp.categories,
            tags: resp.tags,
          })
        }
      }).catch((error) => {
        toast.error(error);
      });

    } else {
      setTimeout(() => {
        this.setState({
          opacity: 0,
          maxHeight: 0
        })
      }, 100)

    }

  }

  render() {
    return (
      <>
        <div style={{display:this.state.opacity === 1 ? 'flex' : 'none'}} className="search-curtains"/>
        <div className="InputBox">
          <SearchIcon />
          <input
            onChange={(e) => {this.handleToggle(e)}}
            value={this.state.search}
            placeholder='جستجو'
            type="search"
          />
          <div style={{opacity: this.state.opacity, maxHeight: this.state.maxHeight}} className="search-toggle">
            <div onClick={()=>{this.setState({opacity: 0,maxHeight: 0, search: ''})}} className="close-modal">
              <CancelOutlinedIcon fontSize={"small"} color={"default"} />
            </div>
            <div className="search-toggle-title">
              <span>{"نتایج جستجو"}</span>
              <span className="search-toggle-title-result">{this.state.search}</span>
            </div>
            {this.state.contents.length > 0 && <div className="search-toggle-list">
              {this.state.contents.map((content, index) => {
                  return (
                    <Link to={(window.location.href.match('blog') ? '/blog/post' : '/product') + `/${content.id}/${content.slug}`} className='search-toggle-list-resul'>{content.title.substr(0, 50)}&nbsp;...</Link>
                  );
                }
              )}
            </div>}
            {this.state.categories.length > 0 && <div className="search-toggle-list">
              {this.state.categories.map((category, index) => {
                  return (
                    <Link to={(window.location.href.match('blog') ? '/blog' : '/products') + `/${category.slug}`} className='search-toggle-list-resul'>{this.state.search}&nbsp;<span>در</span>&nbsp;<b style={{ color: '#2ea3c5'}}>{category.label}</b></Link>
                  );
                }
              )}
            </div>}
            {this.state.tags.length > 0 && <div className="search-toggle-list" style={{ display: "flex", justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
              {this.state.tags.map((tag, index) => {
                return(
                  <Chip component={Link} to={'/blog/tag/' + tag.name} key={index} size={"small"} clickable={true} label={tag.name} />
                );
              })}
            </div>
            }
          </div>
        </div>
      </>
    );
  }
}

export default Index;
