import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const Star = ({stars}:{stars:number;}) => {
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;
        debugger;   
        return (
            <span key={index}>
                {stars >= index + 1 ? (
                    <StarIcon style={{ color: '#E4A33D' }}/>
                ) : stars >= number ? (
                    <StarHalfIcon style={{ color: '#E4A33D' }}/>
                ) : (
                    <StarBorderIcon style={{ color: '#E4A33D' }}/>
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