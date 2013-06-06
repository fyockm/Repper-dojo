dojo version of the classic @tonylukasavage "Repper" app

project layout garnered from dojorama.org

Some Git submodules must be added:
git submodule add git://github.com/SitePen/dgrid.git vendor/SitePen/dgrid
git submodule add git://github.com/kriszyp/put-selector.git vendor/kriszyp/put-selector
git submodule add git://github.com/kriszyp/xstyle.git vendor/kriszyp/xstyle

In index.html, the "baseUrl" must be updated for your local.  Depeneding on your path, shortening to "/js" should work.