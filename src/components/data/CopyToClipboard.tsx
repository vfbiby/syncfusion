import { useCopyToClipboard } from 'usehooks-ts';

export function CopyToClipboard() {
  const [value, copy] = useCopyToClipboard();
  return (
    <>
      <h1>Click to copy:</h1>
      <div className="flex justify-center gap-3">
        <button className='px-2 py-1 rounded' onClick={() => copy('A')}>A</button>
        <button className='px-2 py-1 rounded' onClick={() => copy('B')}>B</button>
        <button className='px-2 py-1 rounded' onClick={() => copy('C')}>C</button>
      </div>
      <p>Copied value: {value ?? 'Nothing is copied yet!'}</p>
    </>
  );
}
