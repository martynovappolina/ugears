import ratingStyle from "./rating.module.scss";

type RatingProps = {
    stars: number;
}

const RatingSend: React.FC<RatingProps> = ({stars}) => {

    const starsStyle = {
        width: stars/5*100 + "%"
    }

    return (
        <div className={ratingStyle.rating}>
            <div className={ratingStyle.rating__body}>
                <div style={starsStyle} className={ratingStyle.rating__active}>
                    <div className={ratingStyle.rating__items}>
                        <input type="radio" className={ratingStyle.rating__item} name="rating" value="1" />
                        <input type="radio" className={ratingStyle.rating__item} name="rating" value="2" />
                        <input type="radio" className={ratingStyle.rating__item} name="rating" value="3" />
                        <input type="radio" className={ratingStyle.rating__item} name="rating" value="4" />
                        <input type="radio" className={ratingStyle.rating__item} name="rating" value="5" />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RatingSend;
