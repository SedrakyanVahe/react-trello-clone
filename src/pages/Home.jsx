import { homeImage } from '../assets/imagesAssets/globalImages'

export const Home = () => {
  return (
    <>
      <div className='site'>
        <h1 className='site_title'>Fast paced way to grow your business</h1>
        <h2 className='site_subtitle'>Manage analytics like a boss</h2>
        <div className='site_box-link'>
          <a className='btn btn_width' href=''>
            Pricing
          </a>
          <a className='btn btn_revert btn_width' href=''>
            Contact
          </a>
        </div>
        <img className='site_img' src={homeImage} />
      </div>
    </>
  )
}
