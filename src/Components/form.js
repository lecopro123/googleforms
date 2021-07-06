import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getForm } from '../Redux/action/action';
import Select from 'react-select';
import ReactStars from 'react-stars'
import './form.css'

const Form = () => {

    const [load, setload] = useState(true);

    const form = useSelector(state => state.SON)

    const dispatch = useDispatch({})

    const [menu, setmenu] = useState(false)

    const [dis, setdis] = useState({});


    const [hobby, sethobby] = useState([])

    const [ele, setele] = useState([])
    const [final, setfinal] = useState({ 'store': 'true' })


    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    //console.log(ele, final, hobby, dis)

    useEffect(() => {
        function former() {
            console.log('loaded...')
            setload(false)
        }
        //setload(true)
        if (form.data.form) return setload(false)
        setTimeout(() => dispatch(getForm(former)), 1000);
    }, [dispatch, form])

    useEffect(() => {
        setele(form)
    }, [form])




    function ranger(k, na, min, max) {
        // console.log(k)
        //setage('0');
        console.log('age rest')
        //if (err.includes(JSON.stringify({ 'name': na, 'err': `Age must be between ${min} and ${max}` }))) seterr(err => [...err, JSON.stringify({ 'name': na, 'err': 'Empty Field' })]);
    }



    function Name(val) {
        //console.log(val)
        if (val.length <= 3) {
            //console.log('hwe')
            return true
        }
    }

    function password(val) {
        if (!format.test(val)) {
            return true
        }
    }

    function submit() {
        var k = 1
        const newElements = { ...ele }
        newElements.data.form.forEach(field => {
            //console.log('hello')
            var { required, name, field_value } = field;
            if (required) {
                if (field['field_value'] === undefined || field['field_value'].length === 0) { field['err'] = `Empty ${name} field`; }
                else if (field['regex-function'] === 'Name') { if (Name(field_value)) { field['err'] = `${name} field must have more than 4 characters`; } else { field['err'] = '' } }
                else if (field['regex-function'] === 'strict-password') { if (password(field_value)) { field['err'] = `${name} field must consist of letters numbers and special characters e.g #,!$` } else { field['err'] = '' } }
                else { field['err'] = '' }
            }
            else if (field['regex-function'] === 'Name') { if (Name(field_value)) { field['err'] = `${name} field must have more than 3 characters` } else { field['err'] = '' } }
            else if (field['regex-function'] === 'strict-password') { if (password(field_value)) { field['err'] = `${name} field must consist of letters numbers and special characters e.g #,!$` } else { field['err'] = '' } }
            else { field['err'] = '' }
            setele(newElements)
            //sethobby([])
        });

        var newel = { ...ele }
        for (let i = 0; i < newel.data.form.length; i++) {
            //console.log(newel.data.form[i], i, newel.data.form[i].err !== '')
            if (newel.data.form[i].err !== '') return k = 0;
            else if (newel.data.form[i].err === '') { dis[newel.data.form[i].name] = newel.data.form[i].field_value === undefined ? '' : newel.data.form[i].field_value }
        }
        //console.log(k)




        if (k) return alert(JSON.stringify(dis))

    }

    function onhandler(event, max, aty, na) {
        //console.log(event.target, aty)

        const newElements = { ...ele }
        newElements.data.form.forEach(field => {
            const { name, type } = field;
            //console.log(type, aty)
            if (Array.isArray(event) && type === aty) {
                field['field_value'] = event.slice(0, max).map(x => x.label)
                //hobby.length < max ? sethobby(Array.isArray(event) ? event.slice(0, max).map(x => x.label) : []) : sethobby([1])
            }
            else if (!isNaN(event) && type === aty) {
                field['field_value'] = event
            }
            else if (type === 'toggle' && name === na) {
                // console.log('hi')
                field['field_value'] = event.target.value;
            }
            else if (event.target !== undefined) {
                //console.log('hi')
                if (name === event.target.name) {
                    // console.log('hi')
                    field['field_value'] = event.target.value;
                }
            }

            setele(newElements)
            sethobby([])
        });

    }

    function Tcai(ele) {
        //console.log(JSON.parse(ele))
        var el = JSON.parse(ele)

        if (el.type === 'text') {
            //setname(el.default)
            return (
                <div>
                    <label>{`Enter ${el.name}`}</label>
                    <input className='in form-control' value={el.field_value === undefined ? '' : el.field_value} name={el.name} onChange={(e) => { onhandler(e) }} type={el.type} placeholder={el.default ? el.default : el.name} ></input>
                    {el.err === undefined || el.err === '' ? null : <p style={{ fontSize: '11px', color: '#FF2F41' }}>{`${el.err}`}</p>}
                </div>
            )
        }
        if (el.type === 'password') {
            //setname(el.default)
            return (
                <div>
                    <label>{`Enter ${el.name}`}</label>
                    <input className='in form-control' value={el.field_value === undefined ? '' : el.field_value} name={el.name} onChange={(e) => { onhandler(e) }} type={el.type} placeholder={el.default ? el.default : el.name} ></input>
                    {el.err === undefined || el.err === '' ? null : <p style={{ fontSize: '11px', color: '#FF2F41' }}>{`${el.err}`}</p>}
                </div>
            )
        }
        if (el.type === "date") {
            //setname(el.default)
            return (
                <div>
                    <label>{`Enter ${el.name}`}</label>
                    <input className='in form-control' value={el.field_value === undefined ? '' : el.field_value} name={el.name} onChange={(e) => { onhandler(e) }} type={el.type} placeholder={el.default ? el.default : el.name} ></input>
                    {el.err === undefined || el.err === '' ? null : <p style={{ fontSize: '11px', color: '#FF2F41' }}>{`${el.err}`}</p>}
                </div>
            )
        }
        if (el.type === "long text") {
            //setname(el.default)
            //console.log(el['min-length'])
            return (
                <div>
                    <label>{`Enter ${el.name}`}</label>
                    <textarea className="form-control" value={el.field_value === undefined ? '' : el.field_value} name={el.name} minLength={el['min-length']} placeholder={el.default ? el.default : el.name} maxLength={el['max-lenght']} onChange={(e) => { onhandler(e) }} required={el.required ? el.required : false}></textarea>
                    {el.err === undefined || el.err === '' ? null : <p style={{ fontSize: '11px', color: '#FF2F41' }}>{`${el.err}`}</p>}
                </div>
            )
        }
        if (el.type === "multi choice dropdown") {
            //setname(el.default)
            var arr = []
            el.list.map(item => arr.push({ 'value': item, 'label': item }))
            //console.log(arr)
            return (
                <div>
                    <label>{`Your ${el.name}`}</label> <p style={{ fontSize: '11px', color: 'green' }}>{`Only first ${el["max-choice"]} choices will be accepted`}</p>
                    <Select isMulti options={arr} value={arr.filter(obj => el.field_value === undefined ? hobby.includes(obj.value) : el.field_value.includes(obj.value))} onChange={(e) => { onhandler(e, el["max-choice"], el.type) }}></Select>
                    {el.err === undefined || el.err === '' ? null : <p style={{ fontSize: '11px', color: '#FF2F41' }}>{`${el.err}`}</p>}
                </div >
            )

        }
        if (el.type === "single choice dropdown") {
            //setname(el.default)
            //console.log(arr)
            return (
                <div>
                    <label>{`${el.name}`}</label>
                    <select className="form-select form-select-lg mb-2 mt-2" aria-label=".form-select-lg example" name={el.name} onChange={(e) => onhandler(e)} onClick={() => setmenu(true)} required={el.required ? el.required : false}>
                        <option defaultValue disabled={menu}>Options</option>
                        {el.list.map(x => <option key={x} value={x}>{x}</option>)}
                    </select>
                    {el.err === undefined || el.err === '' ? null : <p style={{ fontSize: '11px', color: '#FF2F41' }}>{`${el.err}`}</p>}
                </div>
            )
        }
        if (el.type === "int") {
            //setname(el.default)
            //console.log(arr)

            return (
                <div>
                    <label>{`Enter ${el.name}`}</label>
                    <input pattern='[1-9]{1}[0-9]{9}' className='in form-control' name={el.name} value={el.field_value === undefined ? '' : el.field_value} onChange={(e) => { e.target.value < el['min-value'] || e.target.value > el['max-value'] ? ranger(e.target.value, el.name, el['min-value'], el['max-value']) : onhandler(e); setfinal(e.target.value) }} type='number' placeholder={el.default ? el.default : el.name} required={el.required ? el.required : false}></input>
                    {el.err === undefined || el.err === '' ? null : <p style={{ fontSize: '11px', color: '#FF2F41' }}>{`${el.err}`}</p>}
                </div>
            )
        }
        if (el.name === "Rating") {
            //setname(el.default)
            //console.log(arr)
            return (
                <div>
                    <label>{`Provide ${el.name}`}</label>
                    <ReactStars
                        name={el.name}
                        value={el.field_value === undefined ? el.default : el.field_value}
                        count={el['max-value']}
                        onChange={e => onhandler(e, null, el.type)}
                        size={50}
                        color2={'#d97e79'}
                    />
                    {el.err === undefined || el.err === '' ? null : <p style={{ fontSize: '11px', color: '#FF2F41' }}>{`${el.err}`}</p>}
                </div>
            )
        }
        if (el.type === "toggle") {
            //setname(el.default)
            //console.log(arr)
            return (
                <div>
                    <label>{`Enter ${el.name}`}</label>
                    {el.options.map(x =>
                        <div className='d-flex' key={x}>
                            <div className="form-check">
                                <input className="form-check-input" value={x} name={x} type="radio" onChange={(e) => onhandler(e, 0, el.type, el.name)} checked={el.field_value === x ? true : (x === el.default && el.field_value === undefined) ? true : false} />
                                <label className="form-check-label" >
                                    {x}
                                </label>
                            </div>
                        </div>
                    )}
                    {el.err === undefined || el.err === '' ? null : <p style={{ fontSize: '11px', color: '#FF2F41' }}>{`${el.err}`}</p>}
                </div>
            )
        }
    }

    return (
        <div className='container'>
            {load ?
                <div className=' rmod'>
                    <div className='loader'></div>
                </div>
                :
                <>
                    <div className="row pt-3 pb-3 ">
                        <div className='col-12 d-flex justify-content-center ' >
                            <div className="card">
                                <div className="card-body">
                                    <h1>Share with me</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row gy-3'>
                        {form.data.form.map((ele) =>
                            <div className='col-12 d-flex justify-content-center ' key={ele.name}>
                                <div className="card">
                                    <div className="card-body">
                                        {Tcai(JSON.stringify(ele))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="row pt-3 justify-content-center">
                        <button style={{ outline: 'none' }} onClick={submit} className='btn-primary'>Submit</button>
                    </div>
                </>
            }
        </div>
    )
}

export default Form