import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const ControlledCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://uecko.com/wp-content/uploads/2021/03/Vestidor-Clasico-a-Medida-UECKO.jpg"
                    alt="First slide"
                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://images.hola.com/imagenes/decoracion/20220816215034/cocinas-blancas-il/1-124-207/cocinas-blancas-01t-t.jpg"
                    alt="Second slide"
                />


            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://www.lacasadelosazulejos.com/wp-content/uploads/2022/09/STN-Blanco-Brillo-25x40-1.jpg"
                    alt="Third slide"
                />


            </Carousel.Item>
        </Carousel>
    );
}
export default ControlledCarousel
