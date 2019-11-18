import React, { Component } from 'react';


class GridItem extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isHovered: false,
      isMouseDown: false,
    }
  }

  render() {

    return (
      <div
        className={this.getClassName()}
        onMouseEnter={this.onEnter}
        onMouseLeave={this.onLeave}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        <a href={this.props.link}>
          <h2>{this.props.title}</h2>
          {this.props.animatedImage == null || !this.state.isHovered ?
            <img className='grid-image' src={this.props.image} alt=''/>
          :
            <img className='grid-image' src={this.props.animatedImage} alt=''/>
          }
          {this.props.children}
        </a>
      </div>
    )
  }

  onEnter = () => {
    this.setState({ isHovered: true })
  }

  onLeave = () => {
    this.setState({ isHovered: false, isMouseDown: false })
  }

  onMouseDown = () => {
    this.setState({ isMouseDown: true })
  }

  onMouseUp = () => {
    this.setState({ isMouseDown: false })
  }

  getClassName = () => {
    return 'grid-item' + (
      this.state.isHovered ?
        this.state.isMouseDown ?
          ' grid-item-down'
        :
          ' grid-item-hover'
      :
        ''
    )
  }
}

export default GridItem