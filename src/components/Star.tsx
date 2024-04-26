import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const Star = ({stars,fontsize}:{stars:number;fontsize:string;}) => {
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;
        debugger;   
        return (
            <span key={index}>
                {stars >= index + 1 ? (
                    <StarIcon style={{ color: '#E4A33D', fontSize: fontsize}}/>
                ) : stars >= number ? (
                    <StarHalfIcon style={{ color: '#E4A33D', fontSize: fontsize }}/>
                ) : (
                    <StarBorderIcon style={{ color: '#E4A33D', fontSize: fontsize}}/>
                )}
            </span>
        );
    });
    return (
            <div>
                {ratingStar}
            </div>
    )
};

export default Star;