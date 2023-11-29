import ReactLoading from "react-loading"

export default function loadingPage() {
    return (<div style={{width: '100%',height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
    <ReactLoading type="bubbles" color="#E9AEC0"
    height={'10%'} width={'10%'} className='loading_page'/><br></br>
    <p style={{color:'#E9AEC0', fontWeight: 'bold'}}>Bạn chờ tí nhé ^^</p>
</div>)
}