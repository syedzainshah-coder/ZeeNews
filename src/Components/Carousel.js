import React, { Component } from 'react';
import image1 from './images (1).jpeg';
import image2 from './images (2).jpeg';
import image3 from './images (3).jpeg';

export class Carousel extends Component {
  constructor() {
    super();
    this.state = {
      slideIndex: 0
    };
  }

  componentDidMount() {
    this.images = document.querySelectorAll('.images');
    this.showSlide(this.state.slideIndex);
  }

  prev_slide = () => {
    this.setState((prevState) => ({
      slideIndex: (prevState.slideIndex - 1 + this.images.length) % this.images.length
    }), () => {
      this.showSlide(this.state.slideIndex);
    });
  }

  next_slide = () => {
    this.setState((prevState) => ({
      slideIndex: (prevState.slideIndex + 1) % this.images.length
    }), () => {
      this.showSlide(this.state.slideIndex);
    });
  }

  showSlide = (index) => {
    this.images.forEach((item) => {
      item.style.display = 'none';
    });
    this.images[index].style.display = 'block';
  }

  render() {
    return (
      <>
        <div className='d-flex'>
          <div className='images'>
            <img src={image1} alt="" />
          </div>
          <div className='images'>
            <img src={image2} alt="" />
          </div>
          <div className='images'>
            <img src={image3} alt="" />
          </div>
        </div>
        <div className='d-flex'>
          <button onClick={this.prev_slide}>Previous</button>
          <button onClick={this.next_slide}>Next</button>
        </div>
      </>
    );
  }
}

export default Carousel;
