import tag from 'html-tag-js';
import tile from './tile';

/**
 * @typedef {object} PageObj
 * @property {function():void} hide hides the page
 * @property {function():void} onhide executes on page hide event
 */

/**
 * 
 * @param {string} title 
 * @param {object} options 
 * @param {HTMLElement} [options.lead] type of page 
 * @param {HTMLElement} [options.tail] type of page 
 * @returns {HTMLDivElement & PageObj}
 */
function Page(title, options = {}) {
    const leadBtn = options.lead || tag('span', {
        className: 'icon arrow_back',
        onclick: hide,
        attr: {
            action: 'go-back'
        }
    });
    const header = tile({
        type: 'header',
        text: title,
        lead: leadBtn,
        tail: options.tail || undefined
    });
    const $page = tag('div', {
        className: 'page',
        child: header
    });

    if (!window.$placeholder) window.$placeholder = tag('div', {
        style: {
            display: 'none'
        }
    });

    if (!window.pageCount) window.pageCount = 0;
    if (!(pageCount++)) document.body.replaceChild($placeholder, root);

    header.classList.add('light');
    $page.onhide = () => {};
    $page.hide = hide;
    $page.settitle = header.text;
    return $page;

    function hide() {
        if (!(--pageCount)) {
            document.body.replaceChild(root, $placeholder);
            editorManager.editor.resize(true);
        }
        if ($page.isConnected) {
            $page.onhide();
            $page.classList.add('hide');
            setTimeout(() => {
                $page.remove();
            }, 150);
        }
    }
}


export default Page;