import styled from 'styled-components';

export default styled.div`
.slider{
  position: relative;
  border-top: 1px solid #cccccc;
  margin-top: 20px;
}
.slider .nextSlider{
  position: absolute;
  top: calc(50% - 40px);
  z-index: 500;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .5s ease;
  cursor: pointer;
  opacity: .8;
}

.slider .prevSlider{
  position: absolute;
  top: calc(50% - 40px);
  z-index: 500;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .5s ease;
  cursor: pointer;
  opacity: .8;
}
.slider:hover .prevSlider{
  left: 20px;
}
.slider:hover .nextSlider{
  right: 20px;
}
.items{
  position: relative;
  width: calc(100%);
  height: 500px;
  display: flex;
  justify-content: center;
  margin: 0;
}

.items > div {
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0;
  overflow: hidden;
}
.items div img{
  height: 500px;
  width: 100%;
}
.items .seen{
  z-index: 20 !important;
  transition: 2s ease;
  opacity: 1;
}
.slideTitle{
  height: 100px;
  width: 300px;
  background-color: rgba(0,0,0,.8);
  position: absolute;
  bottom: 10px;
  right: -300px;
  transition: all 1.2s;
  color: white;
  font-size: 12px;
  direction: rtl;
  text-align: justify;
  padding: 10px;
  line-height: 2;
}
.seen .slideTitle{
  bottom: 10px;
  right: 10px;
}

@media all and (max-width: 768px){
    .items{
        height: 300px;
    }
    .items div img{
         height: 300px;
          width: 100%;
    }
    .slider .nextSlider{
        right: 10px;
        // height: 40px;
        // width: 40px;
       top: calc(50% - 20);

    }

    .slider .prevSlider{
        left: 10px;
        // height: 40px;
        // width: 40px;
        top: calc(50% - 20);
    }
    .slider:hover .prevSlider{
        left: 10px;
    }
    .slider:hover .nextSlider{
        right: 10px;
    }
    .slideTitle{
        height: 80px;
        width: 200px;
        bottom: 10px;
        right: -200px;
        padding: 5px;
        font-size: 12px;
    }

}

`;
