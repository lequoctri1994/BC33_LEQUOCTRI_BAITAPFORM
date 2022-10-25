import React, { Component } from 'react'

export default class Table extends Component {
    render() {
        const { arrSinhVien,deleteSinhVien,editSinhVien } = this.props;
        return (

            <table className='table mt-2'>
                <thead className='bg-dark text-white'>
                    <tr>
                        <th>Mã SV</th>
                        <th>Họ Tên</th>
                        <th>Số Điện Thoại</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                   
                    {arrSinhVien.map((SV, index) => {
                        return <tr key={index}>
                            <td>{SV.maSV}</td>
                            <td>{SV.hoTenSV}</td>
                            <td>{SV.sdtSV}</td>
                            <td>{SV.emailSV}</td>
                            <td>
                                <button className='btn btn-danger' onClick={()=>{
                                    deleteSinhVien(SV.maSV)
                                }}>Xoá</button>
                                <button className='btn btn-primary mx-2' type='button' onClick={()=>{
                                    editSinhVien(SV)
                                }}>Sửa</button>
                            </td>
                        </tr>
                    })}



                </tbody>

            </table>
        )
    }
}
