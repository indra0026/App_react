import React from 'react';
// import logo from './logo.svg';
import axios from 'axios';

const URL = "http://localhost:2001"
class App extends React.Component {
  // 1. bagian pemyimpanan data state
  constructor(props) {
    super(props);
    this.state = {
      dbTodo: [],
      selectedIndex: null
    }
  }
  componentDidMount() {
    this.getData()
  }

  // cara 2
  // state={
  // message: "Welcome to"
  // }
  // bagian 2
  // bagian function
  // selain data string harus pake kurawal
  getData = () => {
    // fungsi promise di axios mirip dengan condition ada if(then) else(catch)
    axios.get(`${URL}/App`)
      .then((response) => {
        // menampilkan hasil respon data dari url
        console.log(response.data)
        this.setState({ dbTodo: response.data })
      }).catch((error) => {
        console.log(error)
      })
  }

  printToDO = () => {
    let htmlElement = this.state.dbTodo.map((value, index) => {
      if (this.state.selectedIndex == value.id) {
        return (

          <tr>
            <th>{index + 1}</th>
            <td><input type="text" defaultValue={value.kegiatan} ref="editKegiatan"></input></td>
            <td><input type="text" defaultValue={value.detail} ref="editDetail"></input></td>
            <td><button type="button" onClick={this.btnCancel}>Cancel</button>
              <button type="button" onClick={this.btnSave}>Save</button>
            </td>
          </tr>
        )
      } else {
        return (
          <tr>
            <th>{index + 1}</th>
            <td>{value.kegiatan}</td>
            <td>{value.detail}</td>
            <td><button type="button" onClick={() => this.btnDelete(value.id)}>Delete</button></td>
            <button type="button" onClick={() => this.btnEdit(value.id)}>Edit</button>
          </tr>
        )

      }
    })
    return htmlElement
  }
  btnDelete = (id) => {
    axios.delete(`${URL}/App/${id}`)
      .then((res) => {
        this.getData()
      }).catch((err) => {
        console.log(err)
      })
    // let temp = [...this.state.dbTodo]
    // temp.splice(idx, 1)
    // this.setState({ dbTodo: temp })
  }
  btnSave = () => {
    let kegiatan = this.refs.editKegiatan.value;
    let detail = this.refs.editDetail.value;

    axios.patch(`${URL}/App/${this.state.selectedId}`, {
        kegiatan,
        detail
    }).then((res) => {
        this.getData()
        this.setState({ selectedId: null })
    }).catch((err) => {
        console.log(err)
    })
    // let temp = [...this.state.dbTodo]
    // temp[this.state.selectedIndex].kegiatan = this.refs.editKegiatan.value
    // temp[this.state.selectedIndex].detail = this.refs.editDetail.value
    // this.setState({ dbTodo: temp, selectedIndex: null })


  }

  btnEdit = (id) => {
    this.setState({ selectedIndex: id })
  }
  btnCancel = () => {
    this.setState({ selectedIndex: null })
  }
  btnAdd = () => {

    // 1. ambil data
    let kegiatan = this.refs.addKegiatan.value
    let detail = this.refs.addDetail.value

    axios.post(`${URL}/App`, {
      kegiatan,
      detail
    }).then((response) => {
      this.getData()
    }).catch((error) => {
      console.log(error)
    })

    // // 2. duplikasi
    // let temp = [...this.state.dbTodo];

    // // 3. data di push ke var temp
    // temp.push({ kegiatan: kegiatan, detail: detail });

    // // 4. data terbaru disimpan ke state.dbtodo
    // this.setState({ dbTodo: temp });

  }


  // btnIncrement = ()=> {
  //   let value= this.state.usia
  //   value++
  //   this.setState({ usia : value })

  // }

  // 3. render atau create component page
  render() {
    return (
      <div style={{ width: '70vw', margin: "auto", border: "1px solid gray" }}>
        <h2 style={{ textAlign: 'center' }}>To Do List</h2>
        <table className="table" style={{ margin: "auto" }}>
          <thead className="thead-dark">
            <th>No</th>
            <th>Kegiatan</th>
            <th>Detail</th>
            <th>Action</th>
          </thead>
          <tbody>
            {this.printToDO()}

          </tbody>
          <tfoot>
            <th>#</th>
            <th><input type="text" placeholder="Kegiatan Baru" ref="addKegiatan"></input></th>
            <th><input type="text" placeholder="Detail" ref="addDetail"></input></th>
            <th><button className="btn btn-outline-success btn-sm" type="button" onClick={this.btnAdd}>Add</button></th>
          </tfoot>
        </table>
      </div>
    );

  }






  // setTimeout(()=>{
  //   // cara untuk mengganti data pada state  menggunakan this.setState({namaProperty:value})
  //   this.setState({name:"Budi"})

  // },5000)

  // tempat membuat element html
  // <div>
  //   <div>
  //     <h1>Hello, {this.state.name} {this.state.usia} </h1>
  //     <button type="button" onClick={this.btnIncrement} >Increment Age</button>
  //     <h1>Welcome</h1>
  // </div>
  // </div>
}

export default App