import Spline from '@splinetool/react-spline';

export default function Avatar() {
  return (
    <div className="h-[500px] w-full flex items-center justify-center relative z-10">
      <Spline 
        scene="https://prod.spline.design/rpGzP-4bk7VBqqaG/scene.splinecode"
        className="w-full h-full scale-90 md:scale-100"
      />
      
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-transparent opacity-20"></div>
    </div>
  );
}
