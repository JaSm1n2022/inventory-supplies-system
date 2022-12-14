// Table sorting
// https://jsfiddle.net/speeedsam/w1afnvg6/4/
function documentReady(t) {
    /in/.test(document.readyState) ? setTimeout("documentReady(" + t + ")", 9) : t()
}

function findAncestor(t, e) {
    for (;
        (t = t.parentElement) && !t.classList.contains(e););
    return t
}

function unformatNumberString(t) {
    return t = t.replace(/[^\d\.-]/g, ""), Number(t)
}

function extractStringContent(t) {
    var e = document.createElement("span");
    return e.innerHTML = t, e.textContent || e.innerText
}

function setColHeaderDirection(t, e, n) {
    for (var r = 1; r < n.length; r++) r == e ? n[e].setAttribute("data-sort-direction", t) : n[r].setAttribute("data-sort-direction", 0)
}

function renderSortedTable(t, e) {
    for (var n = t.getElementsByTagName("tbody")[0].getElementsByTagName("tr"), r = 0; r < n.length; r++)
        for (var a = n[r].getElementsByTagName("td"), i = 1; i < a.length; i++) a[i].innerHTML = e[r][i]
}
documentReady(function () {
    for (var t = document.getElementsByClassName("sortable-table"), e = [], n = 0; n < t.length; n++) ! function () {
        t[n].setAttribute("data-sort-index", n);
        for (var r = t[n].getElementsByTagName("tbody")[0].getElementsByTagName("tr"), a = 0; a < r.length; a++)
            for (var i = r[a].getElementsByTagName("td"), o = 0; o < i.length; o++) void 0 === e[n] && e.splice(n, 0, []), void 0 === e[n][a] && e[n].splice(a, 0, []), e[n][a].splice(o, 0, i[o].innerHTML);

        for (var s = t[n].getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th"), d = 2; d < s.length; d++) ! function () {

            var n = s[d].classList.contains("numeric-sort");
            // console.log(s);

            s[d].setAttribute("data-sort-direction", 0), s[d].setAttribute("data-sort-index", d), s[d].addEventListener("click", function () {
                var r = this.getAttribute("data-sort-direction"),
                    a = this.getAttribute("data-sort-index"),
                    i = findAncestor(this, "sortable-table").getAttribute("data-sort-index");
                setColHeaderDirection(1 == r ? -1 : 1, a, s), e[i] = e[i].sort(function (t, e) {
                    var i = extractStringContent(t[a]),
                        o = extractStringContent(e[a]);
                    return n && (i = unformatNumberString(i), o = unformatNumberString(o)), i === o ? 0 : 1 == r ? i > o ? -1 : 1 : i < o ? -1 : 1
                }), renderSortedTable(t[i], e[i])
            })
        }()
    }()
});