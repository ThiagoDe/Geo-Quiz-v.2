import { Link } from 'react-router-dom'
import SvgUs from './Us'

const Public = () => {
    window.addEventListener('DOMContentLoaded', (event) => {
    const usMap = document.getElementsByTagName('path')
    
    const addMouseover = function (e) {
                    e.stopPropagation()
                    if (e.target.tagName === 'path') {
                        var content = e.target.dataset.name;
                        var content_id = e.target.dataset.id;
                        
                        boxInfo.style.display = "block";
                        boxInfo.innerHTML = content + " " + content_id;
                        
                        boxInfo.style.opacity = "100%";
                    }
                 
                }

    const addMouseout =  function(e){
                    e.stopPropagation()
                    boxInfo.style.opacity = "0%"
                }
    
    let gameModeBtn = document.getElementById("checkbox");
    var boxInfo = document.getElementById('details-box');
    gameModeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log('event game mode',e)
            

        if (e.target.checked) {
            console.log(gameModeBtn.checked, 'target checked')
            for (let i = 0; i < usMap.length; i++) {
                usMap[i].addEventListener('mouseover', addMouseover);

                usMap[i].addEventListener('mouseout',addMouseout)

                window.onmousemove = function (e) {
                    var x = e.clientX;
                    var y = e.clientY;
                    boxInfo.style.top = (y + 25) + 'px';
                    boxInfo.style.left = (x) + 'px';
                };
            }
        } else if (!e.target.checked) {
            console.log(gameModeBtn.checked)
            for (let i = 0; i < usMap.length; i++) {

                usMap[i].removeEventListener('mouseover', addMouseover)
                usMap[i].removeEventListener('mouseout', addMouseout)
                }
            }
        })

    })

    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Geo-Quiz!</span></h1>
            </header>
            <main className="public__main">
                
                <SvgUs />
                
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public