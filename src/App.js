import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


function Repeat(props) {
  let items = [];
  let k = props.data.length;
  let checkData = props.data;
  for (let i = 0; i < props.numTimes; i++) {
    let tempData = [];
    if (k >= 4) {
      tempData = checkData.splice(0, 4);
    } else {
      tempData = checkData.splice(0, k)
    }
    items.push(props.children(i, tempData));
    k = k - tempData.length;
  }
  return <>{items}</>;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      delimiter: '|',
      lines: 2,
      tableData: []

    }
  }

  handelFile = e => {
    let files = e.target.files;
    let reader = new FileReader();

    reader.readAsText(files[0]);
    reader.onload = e => {
      this.setState({
        data: e.target.result,
        tableData: e.target.result.split(this.state.delimiter)
      })

    }

  }

  handelChange = e => {
    if (e.target.name === 'lines') {

      this.setState({
        lines: e.target.value,
        tableData: this.state.data.split(this.state.delimiter)

      })
    }
    if (e.target.name === 'delimiter') {
      this.setState({
        delimiter: e.target.value,
        tableData: this.state.data.split(e.target.value)
      })
    }

    // console.log(this.state.tableData)
  }


  render() {
    return (
      <div className='container'>
        <div className='row pt-5'>
          <div className='col'>
          <input type='file' name='file' onChange={this.handelFile}></input>
          </div>
        </div>
        <div className='row pt-5'>
          <div className='col'>
            <label className='px-5'>Delimiter : </label>
            <input type='text' name='delimiter' value={this.state.delimiter} onChange={this.handelChange}></input>
          </div>
          <div className='col'>
            <label className='px-5'>Lines : </label>
            <input type='text' name='lines' value={this.state.lines} onChange={this.handelChange}></input>
          </div>
        </div>
        <div className='pt-5 row' >
          <div className='col-6 text-rigth'>
            <table className="table table-bordered" style={{ width: '390px' }}>
              <tbody>
                {this.state.tableData.length > 0 ?
                  <Repeat numTimes={this.state.lines} data={this.state.tableData} >
                    {(index, data) => <tr key={index}><td style={{ textAlign: "right" }}>{data[0]}</td>
                      <td style={{ textAlign: "right" }}>{data[1]}</td>
                      <td style={{ textAlign: "right" }} >{data[2]}</td>
                      <td >{data[3]}</td></tr>}
                  </Repeat>
                  : <></>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
