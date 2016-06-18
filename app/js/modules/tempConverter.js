export default class TempConverter {
  constructor(options){
    this.props = {
      fahrenheitConstant: 32,
      kelvinConstant: 273.15
    }
  }

  fahrenheitTo(outputFormat, value){
    return new Promise(
      (resolve, reject) => {
        switch(outputFormat){
          case('celsius'):
            resolve(parseFloat(((parseFloat(value) - this.props.fahrenheitConstant) * 5) / 9));
          break;
          case('kelvin'):
            resolve(parseFloat(((parseFloat(value) - this.props.fahrenheitConstant) / 1.8) + this.props.kelvinConstant));
          break;
          default:
          break;
        }
      }
    )
  }

  celsiusTo(outputFormat, value){
    return new Promise(
      (resolve, reject) => {
        switch(outputFormat){
          case('fahrenheit'):
            resolve(parseFloat(((parseFloat(value) * 9) / 5) + this.props.fahrenheitConstant));
          break;
          case('kelvin'):
            resolve(parseFloat(parseFloat(value) + this.props.kelvinConstant));
          break;
          default:
          break;
        }
      }
    )
  }

  kelvinTo(outputFormat, value){
    return new Promise(
      (resolve, reject) => {
        switch(outputFormat){
          case('fahrenheit'):
            resolve(parseFloat(((parseFloat(value) - this.props.kelvinConstant) * 1.8) + this.props.fahrenheitConstant));
          break;
          case('celsius'):
            resolve(parseFloat(parseFloat(value) - this.props.kelvinConstant));
          break;
          default:
          break;
        }
      }
    )
  }
}
