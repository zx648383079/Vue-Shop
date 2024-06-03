export class ThemeService {

    public setTitle(title: string, img?: string|null) {
        if (title === undefined || window.document.title === title) {
            return;
        }
        document.title = title;
        if (!img) {
            return;
        }
        const mobile = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(mobile)) {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            // 替换成站标favicon路径或者任意存在的较小的图片即可
            iframe.setAttribute('src',
                img || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
            const iframeCallback = () => {
                setTimeout(() => {
                    iframe.removeEventListener('load', iframeCallback);
                    document.body.removeChild(iframe);
                }, 0);
            }
            iframe.addEventListener('load', iframeCallback);
            document.body.appendChild(iframe);
        }
    }
}