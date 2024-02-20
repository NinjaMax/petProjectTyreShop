import '../css/Pages/CarSelect.css';
import { Helmet } from 'react-helmet';

const CarSelect = () => {

    // let widget = WheelSizeWidgets.create('#ws-widget-f15b73'
    // // , 
    // // {
    // // uuid: 'f15b73e428a74ec897471475764278c5',
    // // type: 'finder',
    // // width: '615'
    // // }
    // );
    // widget.registerUserLinks({
    //     beforeTrim: {
    //       href: 'http://www.wheel-size.com/size/{{ make.slug }}/{{ model.slug }}/{{ year.slug }}/',
    //       icon: 'new-window',
    //       title: '{{ make.title }} {{ model.title }} {{ year.title }} on wheel-size.com'
    //     },
    //     replaceTire: {
    //       href: 'http://www.wheel-size.com/tire/{{ tire }}/',
    //       title: '{{ tire }} on wheel-size.com'
    //     },
    //     afterBoltPattern: {
    //       href: 'http://www.wheel-size.com/pcd/{{ bolt_pattern }}/',
    //       text: 'on site',
    //       title: '{{ bolt_pattern }} on wheel-size.com'
    //     }
    //   });


  return (
    <div>CarSelect
        <div id="ws-widget-f15b73">
            <iframe src="//services.wheel-size.com/widget/f15b73e428a74ec897471475764278c5/"
                width="615" height="400"
                title='CarsWidget'
            >
            </iframe>
        </div>
        <Helmet>
        
        <script>
            var widget = WheelSizeWidgets.create('#ws-widget-fdbe15');
        </script>
        </Helmet>

    </div>
    
  )
}

export default CarSelect