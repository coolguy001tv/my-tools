"use client"

import {useEffect, useState} from "react";

function copyToClipboard(text:string) {
    // 使用navigator.clipboard API复制文本
    navigator.clipboard.writeText(text).then(() => {
        console.log('Text copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

export default function Page(){
    const [ck,setCK] = useState('');
    const [core,setCore] = useState('');
    const [showSuccess, setShowSuccess]= useState(false);
    const getCore = function (str:string){
        const reg = /pt_key=(.+?); pt_pin=(\w+?);/;
        const matches = reg.exec(str);
        if(matches){
            setCore(matches[0]);
        }

    }
    const copy = function (){
        copyToClipboard(core);
        setShowSuccess(true);
        setTimeout(()=>{
            setShowSuccess(false)
        },2000)
    }
    useEffect(()=>{
        getCore(ck);
    },[ck])
    return (
        <>
            <h1 className={'h1'}>JD Cookie小工具</h1>
            <label htmlFor='core'>输出结果：</label>
            <div id={'core'}  className="bg-success" style={{minHeight:50 ,marginBottom:10}}>{core} </div>
            <div className={'flex'} style={{alignItems:"center"}}>
                <button className="btn btn-primary" onClick={copy}>复制</button>
                {showSuccess && <span className="text-success" style={{marginLeft:10}}>复制成功</span>}
                <button className={'btn btn-danger'} style={{marginLeft:10}} onClick={()=>setCK('')}>清空</button>
            </div>
            <div style={{marginTop:20}}>
                <label htmlFor='ck'>复制ck到下方:</label>
                <textarea id={'ck'} onChange={e=>setCK(e.target.value)} value={ck} style={{width:'100%',height:600}}/>
            </div>
        </>
    )
}
