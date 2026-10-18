'use client';

import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { attachImage, createUploadUrl, makeCover, removeImage } from '../actions';

// Phone photos are 3–10 MB; shrink to 2400px JPEG in the browser before upload.
async function downscale(file: File, max = 2400): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext('2d')!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    return await new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error('encode'))), 'image/jpeg', 0.86));
  } catch {
    return file; // e.g. a format the browser can't decode: upload as is
  }
}

export default function Photos({ itemId, photos }: { itemId: string; photos: { path: string; url: string }[] }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [, startTransition] = useTransition();

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setError('');
    const list = Array.from(files);
    for (let i = 0; i < list.length; i++) {
      setBusy(`上传中 ${i + 1}/${list.length}…`);
      try {
        const blob = await downscale(list[i]);
        const ext = blob.type === 'image/jpeg' ? 'jpg' : (list[i].name.split('.').pop() ?? 'jpg');
        const { path, url } = await createUploadUrl(itemId, ext);
        const res = await fetch(url, { method: 'PUT', body: blob, headers: { 'content-type': blob.type || 'image/jpeg' } });
        if (!res.ok) throw new Error(`上传失败（${res.status}）`);
        await attachImage(itemId, path);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
        break;
      }
    }
    setBusy('');
    if (fileRef.current) fileRef.current.value = '';
    router.refresh();
  }

  const act = (fn: () => Promise<void>) => startTransition(async () => { await fn(); router.refresh(); });

  return (
    <section className="rounded-sm border border-line bg-card p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-semibold">照片 <span className="text-sm font-normal text-muted">（第一张为封面）</span></h2>
        <label className={`cursor-pointer rounded-sm bg-accent px-4 py-2 text-sm text-accent-ink ${busy ? 'pointer-events-none opacity-60' : ''}`}>
          {busy || '+ 拍照 / 选图'}
          <input ref={fileRef} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => upload(e.target.files)} />
        </label>
      </div>
      <p className="mt-1 text-xs text-muted">建议拍：正面、背面、底部、款识、损伤或修复处、带尺子的比例照。</p>
      {error && <p className="mt-2 text-sm text-accent">{error}</p>}
      {photos.length > 0 && (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {photos.map((p, i) => (
            <li key={p.path} className="overflow-hidden rounded-sm border border-line bg-paper">
              <a href={p.url} target="_blank" rel="noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={`照片 ${i + 1}`} className="aspect-square w-full object-cover" />
              </a>
              <div className="flex justify-between px-2 py-1.5 text-xs">
                {i === 0 ? <span className="text-gold">封面</span> : (
                  <button type="button" onClick={() => act(() => makeCover(itemId, p.path))} className="text-muted hover:text-ink">设为封面</button>
                )}
                <button
                  type="button"
                  onClick={() => { if (window.confirm('删除这张照片？')) act(() => removeImage(itemId, p.path)); }}
                  className="text-muted hover:text-accent"
                >
                  删除
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
