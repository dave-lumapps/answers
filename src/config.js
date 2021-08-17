/**
 *  Create-LumApps-Widget config file
 *  update the following to fit your needs
 */

export const useGlobalSettings = true;

/**
 * The ids of your partner and extension
 */
const partnerId = '111';
const extensionId = '222';

const description = {
    en: '"Prototype to allow users to view answered questions',
    fr: 'A description for Test 1',
};

const name = {
    en: 'Q&A Finder Widget',
    fr: 'Test 1',
};

const icon = {
    en:
        'https://lh3.googleusercontent.com/-6F_iwel8KGY/WD8MdGS0PkI/AAAAAAAAGDI/KaqvKtZCK_AsdK6BcKp6Cy1MpwoEWCUvgCKgB/s400/logo.png', // a working link to your widget icon
};

/**
 * Whether the extension requires an oauth application
 */
const oauth = false;

/**
 * The documentation's url of the enxtension.
 */
const links = {
    documentation: null,
}

/**
 * The components available for your extensions
 * 'content' : For the Widget content itself (required)
 * 'settings' : For your widget settings
 * 'globalSettings' : For globalsettings used by platform admin.
 */
const components = ['content', 'settings', 'global_settings'];

// Whether the extension is public or not in the marketplace.
const isPublic = true;

/**
 * The list of authorized customer ids.
 *
 * If your extension is not public only these customers will see and
 * will be able to install this extensions.
 */
const whitelist = [];

// do not change the following unless you know what you are doing
const config = {
    partnerId,
    extensionId,
    name,
    description,
    icon,
    oauth,
    links,
    components,
    isPublic,
    public: isPublic,
    whitelist,
    category: 'widget',
};

if (!useGlobalSettings) {
    config.components.pop();
}

export default config;
