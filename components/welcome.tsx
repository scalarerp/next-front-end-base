import { useState } from "react";

export function Welcome() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div data-testid="main-component">
      <div>
        <div className="lower">
          welcome
          <span id="spanid">sometext2</span>
          <div className="lower2">welcome lower2</div>
          <label>
          <input type="checkbox" checked={isChecked} onChange={()=>setIsChecked(!isChecked)} />
          {isChecked?'on':'off'}
          </label>
        </div>
      </div>
    </div>
  );
}
