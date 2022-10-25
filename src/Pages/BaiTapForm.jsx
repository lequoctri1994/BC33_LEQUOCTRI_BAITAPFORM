import React, { Component } from 'react'
import Table from '../Components/Table';

export default class BaiTapForm extends Component {
    state = {
        values: {
            maSV: '',
            hoTenSV: '',
            sdtSV: '',
            emailSV: ''
        },
        errors: {
            maSV: '',
            hoTenSV: '',
            sdtSV: '',
            emailSV: ''
        },
        isSubmit: true,
        arrSinhVien: [
            {maSV:'1',hoTenSV:'Nguyễn Văn A', sdtSV:'09080706050',emailSV:'nguyenvana@gmail.com'},
            {maSV:'2',hoTenSV:'Lê Văn B', sdtSV:'07080602395',emailSV:'levanb@gmail.com'}
        ]

    }
    handleChangeInput = (e) => {
        let { value, id } = e.target;
        console.log(value, id)

        let newValues = { ...this.state.values };
        newValues[id] = value;

        let newErrors = { ...this.state.errors };
        let messError = '';
        if (value.trim() == '') {
            messError = 'không được bỏ trống !'
        } else {
            let dataType = e.target.getAttribute('data-type');
            if (dataType === 'number') {
                let regexNumber = /^\d+$/;
                if (!regexNumber.test(value)) {
                    messError = 'Số điện thoại phải nhập số !'
                }
            } else if (dataType === 'email') {
                let regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if (!regexEmail.test(value)) {
                    messError = 'Email phải đúng định dạng !'
                }
            } else if (dataType === 'maSV') {
                let regexNumber = /^\d+$/;
                if (!regexNumber.test(value)) 
                messError = 'Mã sinh viên phải nhập số !'
            } else if (dataType === 'tenSV') {
                let regexAlpha = /^[a-z]+$/i;
                if(!regexAlpha.test(value)) {
                    messError = 'Tên sinh viên không được nhập số !'
                }
            }
        }
        newErrors[id] = messError;
        let submit = false;
        for(let key in newValues){
            if(newValues[key].trim() === '') {
                submit = true;
            }
        }

        this.setState({
            values: newValues,
            errors: newErrors,
            isSubmit: submit
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let {errors} = this.state;
        for (let key in errors) {
            if(errors[key] !== '') {
                alert('Dữ liệu không hợp lệ !')
                return
            }
        }
        this.state.arrSinhVien.push(this.state.values);
        console.log(this.state.arrSinhVien)
        this.setState({
            arrSinhVien:this.state.arrSinhVien
        })
    }

    deleteSinhVien = (idClick) => {
       this.state.arrSinhVien = this.state.arrSinhVien.filter(SV => SV.maSV != idClick);
       this.setState({
        arrSinhVien:this.state.arrSinhVien
       })
    }

    editSinhVien = (SVEdit) => {
        this.setState({
            values:SVEdit
        })
    }
    handleUpdate = () => {
        let {values,arrSinhVien} = this.state;
        let SVUpdate = arrSinhVien.find(SV => SV.maSV === values.maSV)

        for (let key in SVUpdate){
            SVUpdate[key] = values[key]
        }
    }




    render() {
        let {maSV, hoTenSV, emailSV, sdtSV} = this.state.values;



        return (
            <>
                <form action="" className='container' onSubmit={this.handleSubmit}>
                    <h1 className='text-center'>Bài Tập Form</h1>
                    <div className="card">
                        <div className="card-header bg-dark text-white">
                            <h2>Thông tin sinh viên</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-group">
                                        <p>Mã SV</p>
                                        <input type="text" className='form-control' id='maSV' name='maSV' data-type='maSV' value={maSV} onInput={(e) => {
                                            this.handleChangeInput(e);
                                        }} />
                                        <p className='text-danger'>{this.state.errors.maSV}</p>
                                    </div>
                                    <div className="form-group">
                                        <p>Số Điện Thoại</p>
                                        <input type="text" data-type='number' className='form-control' id='sdtSV' name='sdtSV' value={sdtSV} onInput={(e) => {
                                            this.handleChangeInput(e);
                                        }} />
                                        <p className='text-danger'>{this.state.errors.sdtSV}</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-group">
                                        <p>Họ Tên</p>
                                        <input type="text" className='form-control' id='hoTenSV' name='hoTenSV' data-type='tenSV' value={hoTenSV} onInput={(e) => {
                                            this.handleChangeInput(e);
                                        }} />
                                        <p className='text-danger'>{this.state.errors.hotenSV}</p>
                                    </div>
                                    <div className="form-group">
                                        <p>Email</p>
                                        <input type="text" className='form-control' id='emailSV' name='emailSV' data-type='email' value={emailSV} onInput={(e) => {
                                            this.handleChangeInput(e);
                                        }} />
                                        <p className='text-danger'>{this.state.errors.emailSV}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button className='btn btn-success' disabled={this.state.isSubmit} type='submit'>Thêm Sinh Viên</button>
                            <button className='btn btn-primary mx-2' onClick={()=>{
                                this.handleUpdate();
                            }}>Update</button>
                        </div>
                    </div>
                    <Table arrSinhVien={this.state.arrSinhVien} deleteSinhVien={this.deleteSinhVien} editSinhVien={this.editSinhVien}/>

                </form>
            </>
        )
    }
}
