import { useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Counter({ value, suffix='' }) {
  const ref = useRef(null); const visible = useInView(ref, { once:true, amount:.7 }); const [n,setN] = useState(0)
  useEffect(() => { if (!visible) return; let start=0; const duration=1100; const t0=performance.now(); const step=(t)=>{ const p=Math.min((t-t0)/duration,1); const e=1-Math.pow(1-p,3); setN(Number((start+(value-start)*e).toFixed(value%1?1:0))); if(p<1) requestAnimationFrame(step) }; requestAnimationFrame(step) },[visible,value])
  return <span ref={ref}>{n}{suffix}</span>
}
