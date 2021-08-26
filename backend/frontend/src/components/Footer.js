import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


function Footer() {

    return (
        <div>
            <div className="text-right bg-white pt-2">
                <svg id="footer-avocado-icon" viewBox="-125 0 432 280"  xmlns="http://www.w3.org/2000/svg"><path d="m66.808594 8.859375c-14.324219 4.789063-24.03125 17.027344-26.304688 30.964844 10.191406 9.773437 25.308594 13.722656 39.632813 8.941406 14.320312-4.785156 24.035156-17.023437 26.304687-30.960937-10.1875-9.777344-25.308594-13.722657-39.632812-8.945313zm0 0" fill="#adf2a2"/><path d="m66.808594 8.859375-2.164063-6.476563c-16.808593 5.621094-28.226562 20-30.878906 36.339844-.359375 2.207032.398437 4.476563 2.015625 6.027344 8.519531 8.167969 19.949219 12.855469 31.933594 12.859375 4.839844.003906 9.761718-.765625 14.578125-2.371094l.007812-.003906c16.804688-5.613281 28.226563-19.996094 30.878907-36.335937.359374-2.207032-.398438-4.476563-2.011719-6.023438-8.519531-8.171875-19.949219-12.87109375-31.9375-12.875-4.832031-.00390625-9.761719.757812-14.597657 2.390625l.011719-.007813 2.164063 6.476563 2.179687 6.46875c3.402344-1.144531 6.839844-1.671875 10.242188-1.675781 8.394531-.003906 16.488281 3.316406 22.484375 9.074218l4.726562-4.921874-6.738281-1.101563c-1.890625 11.535156-9.894531 21.632813-21.726563 25.582031l.007813-.003906c-3.425781 1.136719-6.875 1.675781-10.269531 1.675781-8.398438.003907-16.488282-3.3125-22.484375-9.0625l-4.726563 4.929688 6.738282 1.097656c1.894531-11.535156 9.894531-21.636719 21.734374-25.585937l.011719-.007813zm0 0" fill="#54596e"/><path d="m201.488281 123.703125c0-40.457031-32.800781-73.261719-73.261719-73.261719-40.46875 0-73.269531 32.804688-73.269531 73.261719 0 60.519531-47.78125 122.390625-47.78125 181.117187 0 66.855469 54.191407 121.042969 121.050781 121.042969 66.851563 0 121.042969-54.1875 121.042969-121.042969 0-58.726562-47.78125-120.597656-47.78125-181.117187" fill="#61c5a8"/><path d="m201.488281 123.703125h6.828125c-.003906-44.230469-35.855468-80.09375-80.089844-80.09375-44.242187 0-80.09375 35.863281-80.097656 80.09375.054688 28.4375-11.429687 58.375-23.410156 88.730469-11.902344 30.378906-24.304688 61.144531-24.371094 92.386718.007813 70.628907 57.246094 127.867188 127.878906 127.875 70.625-.007812 127.863282-57.246093 127.871094-127.875-.066406-31.242187-12.46875-62.007812-24.363281-92.386718-11.988281-30.355469-23.472656-60.292969-23.417969-88.730469h-13.65625c.058594 32.085937 12.457032 63.34375 24.363282 93.726563 12.003906 30.382812 23.484374 59.910156 23.417968 87.390624 0 31.558594-12.769531 60.078126-33.449218 80.761719-20.691407 20.679688-49.207032 33.457031-80.765626 33.460938-31.5625-.007813-60.074218-12.78125-80.765624-33.460938-20.683594-20.683593-33.457032-49.203125-33.457032-80.761719-.066406-27.484374 11.425782-57.007812 23.417969-87.390624 11.90625-30.382813 24.304687-61.640626 24.363281-93.726563 0-18.371094 7.421875-34.9375 19.460938-46.980469 12.046875-12.039062 28.613281-19.453125 46.980468-19.460937 18.363282.007812 34.929688 7.425781 46.976563 19.460937 12.039063 12.046875 19.460937 28.613282 19.460937 46.980469z" fill="#54596e"/><path d="m128.226562 221.066406c-41.480468 0-75.09375 51.457032-75.09375 93.867188 0 42.417968 33.613282 76.800781 75.09375 76.800781 41.472657 0 75.085938-34.382813 75.085938-76.800781 0-42.410156-33.613281-93.867188-75.085938-93.867188" fill="#5eaa99"/><path d="m189.664062 302.988281c0-33.933593-27.507812-75.09375-61.441406-75.09375s-61.441406 41.160157-61.441406 75.09375c0 33.933594 27.507812 61.441407 61.441406 61.441407s61.441406-27.511719 61.441406-61.441407zm0 0" fill="#bfad88"/><path d="m189.664062 302.988281h6.824219c-.046875-18.804687-7.421875-38.699219-19.398437-54.421875-6.007813-7.847656-13.21875-14.652344-21.453125-19.574218-8.21875-4.914063-17.535157-7.925782-27.414063-7.925782-9.878906-.003906-19.195312 3.011719-27.414062 7.925782-12.347656 7.394531-22.40625 18.964843-29.535156 32.066406-7.101563 13.117187-11.300782 27.820312-11.316407 41.925781.003907 37.707031 30.558594 68.261719 68.265625 68.265625 37.707032-.003906 68.261719-30.558594 68.265625-68.265625h-13.652343c-.003907 15.101563-6.101563 28.714844-15.996094 38.617187-9.902344 9.894532-23.511719 15.992188-38.617188 15.996094-15.105468-.003906-28.714844-6.101562-38.617187-15.996094-9.894531-9.902343-15.992188-23.515624-15.996094-38.617187-.050781-15.132813 6.328125-32.78125 16.589844-46.125 5.109375-6.679687 11.140625-12.289063 17.609375-16.144531 6.480468-3.867188 13.328125-5.996094 20.414062-6 7.085938.003906 13.933594 2.132812 20.414063 6 9.707031 5.773437 18.410156 15.542968 24.53125 26.855468 6.148437 11.292969 9.683593 24.070313 9.667969 35.414063h6.828124zm0 0" fill="#54596e"/><path d="m128.222656 243.820312c-7.050781-.003906-13.671875 2.15625-19.441406 5.605469-8.671875 5.203125-15.601562 13.214844-20.523438 22.25-4.894531 9.046875-7.804687 19.171875-7.820312 29.039063 0 3.769531 3.058594 6.828125 6.828125 6.828125s6.824219-3.058594 6.824219-6.828125c-.046875-9.480469 4.039062-20.871094 10.59375-29.371094 3.257812-4.261719 7.082031-7.800781 11.097656-10.195312 4.03125-2.402344 8.183594-3.675782 12.445312-3.675782 3.769532 0 6.824219-3.058594 6.824219-6.824218 0-3.769532-3.054687-6.824219-6.824219-6.824219v-.003907zm0 0" fill="#fff"/><path d="m144.613281 9.441406s-13.667969 13.667969-13.667969 40.996094" fill="#bfad88"/><path d="m139.785156 4.613281c-.398437.402344-4.285156 4.375-8.113281 12.023438-3.824219 7.640625-7.558594 18.988281-7.550781 33.800781h13.652344c.003906-12.519531 3.105468-21.664062 6.113281-27.695312 1.503906-3.007813 2.988281-5.226563 4.054687-6.644532.527344-.707031.957032-1.21875 1.222656-1.523437l.277344-.308594zm0 0" fill="#54596e"/><path d="m134.59375 25.867188s-6.371094-6.371094-25.484375-6.371094" fill="#adf2a2"/><g fill="#54596e"><path d="m139.421875 21.042969c-1.179687-1.273438-9.695313-8.445313-30.3125-8.375-3.769531 0-6.828125 3.054687-6.828125 6.828125 0 3.769531 3.058594 6.824218 6.828125 6.824218 8.800781 0 14.269531 1.460938 17.371094 2.699219 1.554687.621094 2.523437 1.191407 3.03125 1.53125l.429687.3125.011719.003907 2.324219-2.683594-2.511719 2.507812.1875.179688 2.324219-2.6875-2.511719 2.511718c2.664063 2.664063 6.984375 2.664063 9.652344.003907 2.664062-2.664063 2.667969-6.984375.003906-9.652344zm0 0"/><path d="m88.109375 151.035156c8.980469 9.75 23.648437 15.359375 40.113281 15.414063 16.304688-.050781 30.839844-5.554688 39.84375-15.125 2.566406-2.765625 2.40625-7.082031-.355468-9.648438-2.765626-2.5625-7.082032-2.402343-9.644532.363281-5.4375 5.96875-16.707031 10.816407-29.84375 10.761719-13.265625.058594-24.628906-4.894531-30.011718-10.945312-2.535157-2.792969-6.855469-2.996094-9.644532-.460938-2.789062 2.535157-2.992187 6.851563-.457031 9.644531zm0 0"/><path d="m94.089844 108.429688c0 5.652343-4.585938 10.238281-10.242188 10.238281-5.652344 0-10.238281-4.585938-10.238281-10.238281 0-5.65625 4.585937-10.242188 10.238281-10.242188 5.65625 0 10.242188 4.585938 10.242188 10.242188zm0 0"/><path d="m182.835938 108.429688c0 5.652343-4.585938 10.238281-10.238282 10.238281-5.65625 0-10.242187-4.585938-10.242187-10.238281 0-5.65625 4.585937-10.242188 10.242187-10.242188 5.652344 0 10.238282 4.585938 10.238282 10.242188zm0 0"/></g></svg>
            </div>
            
            <footer className="border-top pt-2 bg-white" >
                <Container>
                    <Row>
                        <Col className="text-center mb-3 mt-0 pt-2">
                            <div><strong>Copyright &copy; 2021 Boutsacado</strong></div> 
                            <div>Logo icon created by {' '}
                                <a  href="https://www.flaticon.com/authors/darius-dan"
                                    className="text-primary font-weight-bold"
                                    title="Darius Dan">Darius Dan</a> from {' '}
                                <a  href="https://www.flaticon.com/"
                                    className="text-primary font-weight-bold"
                                    title="Flaticon">flaticon.com</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    )
}


export default Footer;
