<?php if ( cz('features_enable') ) : ?>

	<?php $features = cz( 'features' ) ?>

    <div class="features">
        <div class="row no-gutters">
            <div class="feature col-xl-3 col-md-6 col-sm-6">
                <div class="img-feat">
                    <span>
                        <svg width="67" height="64" viewBox="0 0 67 64" fill="<?php echo cz( 'features_icon_color' ) ?>" xmlns="http://www.w3.org/2000/svg">
                            <rect width="68" height="65" fill="black" fill-opacity="0" transform="scale(0.984616)"/>
                            <rect width="68" height="65" fill="black" fill-opacity="0" transform="scale(0.984616)"/>
                            <rect width="58.0497" height="34.5109" fill="black" fill-opacity="0" transform="translate(9.79712 30.02) scale(0.984616)"/>
                            <rect width="58.0497" height="34.5109" fill="black" fill-opacity="0" transform="translate(9.79712 30.02) scale(0.984616)"/>
                            <path d="M62.797 34.2021V59.8178H13.954V34.2021H62.797ZM66.9539 30.02H9.79712V64H66.9539V30.02Z"/>
                            <rect width="58.0497" height="34.5109" fill="black" fill-opacity="0" transform="translate(9.79712 30.02) scale(0.984616)"/>
                            <path d="M51.3657 30.02L57.2164 35.9064C57.1723 36.1233 57.0865 36.3246 57.0865 36.5546C57.0865 38.4287 58.596 39.9448 60.4588 39.9448C60.6874 39.9448 60.8849 39.8585 61.1005 39.8167L66.9539 45.7031V30.02H51.3657Z"/>
                            <path d="M55.2623 50.4028C57.1248 50.4028 58.6346 48.8838 58.6346 47.01C58.6346 45.1362 57.1248 43.6172 55.2623 43.6172C53.3999 43.6172 51.8901 45.1362 51.8901 47.01C51.8901 48.8838 53.3999 50.4028 55.2623 50.4028Z"/>
                            <path d="M38.3754 55.9336C44.0086 55.9336 48.5753 51.9383 48.5753 47.0099C48.5753 42.0815 44.0086 38.0862 38.3754 38.0862C32.7421 38.0862 28.1755 42.0815 28.1755 47.0099C28.1755 51.9383 32.7421 55.9336 38.3754 55.9336Z"/>
                            <path d="M21.4881 50.4002C23.3491 50.4002 24.8577 48.8824 24.8577 47.01C24.8577 45.1377 23.3491 43.6199 21.4881 43.6199C19.627 43.6199 18.1184 45.1377 18.1184 47.01C18.1184 48.8824 19.627 50.4002 21.4881 50.4002Z"/>
                            <path d="M9.79724 45.7031L15.648 39.8167C15.8637 39.8611 16.0637 39.9474 16.2923 39.9474C18.1551 39.9474 19.662 38.4287 19.662 36.5546C19.662 36.3246 19.5762 36.1259 19.5321 35.909L25.3854 30.02H9.79724V45.7031Z"/>
                            <path d="M19.6645 57.4653C19.6645 55.5912 18.155 54.0752 16.2922 54.0752C16.0636 54.0752 15.8661 54.1614 15.6505 54.2033L9.79712 48.3169V64H25.3853L19.5346 58.1136C19.5787 57.8966 19.6645 57.6927 19.6645 57.4653Z"/>
                            <path d="M60.4588 54.0726C58.596 54.0726 57.0891 55.5912 57.0891 57.4653C57.0891 57.6954 57.1749 57.894 57.219 58.111L51.3657 64H66.9539V48.3169L61.1031 54.2033C60.8875 54.1588 60.6874 54.0726 60.4588 54.0726Z"/>
                            <rect width="65.3455" height="39.0611" fill="black" fill-opacity="0" transform="scale(0.984616)"/>
                            <path d="M47.9936 23.9402C49.8546 23.9402 51.3633 22.4224 51.3633 20.55C51.3633 18.6777 49.8546 17.1599 47.9936 17.1599C46.1326 17.1599 44.624 18.6777 44.624 20.55C44.624 22.4224 46.1326 23.9402 47.9936 23.9402Z"/>
                            <path d="M5.90013 30.02C5.90013 27.8558 7.64601 26.0993 9.79718 26.0993H11.9276L12.0237 25.7647L42.1011 9.1929L44.4004 9.86727C44.4653 10.0764 44.4887 10.2959 44.6004 10.4972C45.4942 12.1439 47.5414 12.7425 49.1782 11.8433C49.3756 11.7336 49.5107 11.5637 49.6744 11.4199L51.9788 12.0995L57.2191 21.7237L56.5462 24.0396C56.3409 24.1023 56.1227 24.1258 55.9227 24.2356C55.1614 24.6538 54.6548 25.3386 54.3872 26.0993H64.3403L57.6218 13.7541H57.6244L50.1342 0L36.4582 7.53311H36.4608L13.6734 20.0874L0 27.6205L5.90013 38.4602V30.02Z"/>
                            <path d="M28.9188 20.8873C26.6559 22.1315 25.0269 24.0187 24.1124 26.0993H42.904C42.7533 25.3021 42.5273 24.5205 42.1272 23.786C39.7707 19.4627 33.8602 18.1662 28.9188 20.8873Z"/>
                        </svg>
                    </span>
                </div>
                <div class="text-feat">
                    <div class="features-main-text"><?php echo $features[ 'item' ][0][ 'head' ] ?></div>
                    <p><?php echo $features[ 'item' ][0][ 'text' ] ?></p>
                </div>
            </div>
            <div class="feature col-xl-3 col-md-6 col-sm-6">
                <div class="img-feat">
                    <span>
                        <svg width="67" height="47" viewBox="0 0 67 47" fill="<?php echo cz( 'features_icon_color' ) ?>" xmlns="http://www.w3.org/2000/svg">
                            <rect width="68" height="48" fill="black" fill-opacity="0" transform="scale(0.979167)"/>
                            <path d="M3.28568 32.2804H35.4024C35.9246 32.2804 36.3489 31.8542 36.3489 31.3297V2.86306C36.3489 1.27854 35.076 0 33.4984 0H5.18961C3.61207 0 2.33915 1.27854 2.33915 2.86306V31.3188C2.33915 31.8433 2.76345 32.2804 3.28568 32.2804ZM5.54864 5.29993C5.54864 3.99954 6.60396 2.93955 7.89864 2.93955H31.2681C32.5628 2.93955 33.6181 3.99954 33.6181 5.29993V28.7836C33.6181 29.2207 33.27 29.5703 32.8348 29.5703H6.33197C5.89679 29.5703 5.54864 29.2207 5.54864 28.7836V5.29993Z"/>
                            <path d="M14.1979 35.1325H0.946528C0.424306 35.1325 0 35.5587 0 36.0832V38.9791C0 39.5036 0.424306 39.9298 0.946528 39.9298H11.5651C11.8479 38.0284 12.8053 36.3346 14.1979 35.1325Z"/>
                            <path d="M19.2897 35.1325C16.0258 35.1325 13.382 37.788 13.382 41.0663C13.382 44.3446 16.0258 47 19.2897 47C22.5536 47 25.1973 44.3446 25.1973 41.0663C25.1973 37.788 22.5536 35.1325 19.2897 35.1325ZM19.2897 44.0386C17.6577 44.0386 16.3304 42.7054 16.3304 41.0663C16.3304 39.4271 17.6577 38.0939 19.2897 38.0939C20.9216 38.0939 22.2489 39.4271 22.2489 41.0663C22.2489 42.7054 20.9216 44.0386 19.2897 44.0386Z"/>
                            <path d="M50.2205 35.1325C46.9566 35.1325 44.3128 37.788 44.3128 41.0663C44.3128 44.3446 46.9566 47 50.2205 47C53.4843 47 56.1281 44.3446 56.1281 41.0663C56.1281 37.788 53.4843 35.1325 50.2205 35.1325ZM50.2205 44.0386C48.5885 44.0386 47.2612 42.7054 47.2612 41.0663C47.2612 39.4271 48.5885 38.0939 50.2205 38.0939C51.8524 38.0939 53.1797 39.4271 53.1797 41.0663C53.1797 42.7054 51.8524 44.0386 50.2205 44.0386Z"/>
                            <path d="M65.6369 35.1325H63.3195V22.1614C63.3195 20.6424 62.8626 19.1563 62.0139 17.8886L56.226 9.28854C54.8116 7.19042 52.4507 5.92281 49.9267 5.92281H40.9619C39.9174 5.92281 39.0579 6.77517 39.0579 7.83516V35.1325H24.3704C25.763 36.3346 26.7204 38.0284 27.0033 39.9407H42.4959C43.0507 36.1488 46.2929 33.2311 50.2204 33.2311C54.148 33.2311 57.3901 36.1488 57.945 39.9407H65.6369C66.1591 39.9407 66.5834 39.5146 66.5834 38.99V36.0942C66.5834 35.5587 66.1591 35.1325 65.6369 35.1325ZM56.1716 19.6152H44.3345C43.8123 19.6152 43.388 19.189 43.388 18.6645V12.0642C43.388 11.5396 43.8123 11.1135 44.3345 11.1135H51.5477C51.8524 11.1135 52.1461 11.2665 52.3202 11.5178L56.944 18.1181C57.3901 18.741 56.9332 19.6152 56.1716 19.6152Z"/>
                        </svg>
                    </span>
                </div>
                <div class="text-feat">
                    <div class="features-main-text"><?php echo $features[ 'item' ][1][ 'head' ] ?></div>
                    <p><?php echo $features[ 'item' ][1][ 'text' ] ?></p>
                </div>
            </div>
            <div class="feature col-xl-3 col-md-6 col-sm-6">
                <div class="img-feat">
                    <span>
                        <svg width="68" height="60" viewBox="0 0 68 60" fill="<?php echo cz( 'features_icon_color' ) ?>" xmlns="http://www.w3.org/2000/svg">
                            <rect width="68" height="60.8955" fill="black" fill-opacity="0" transform="scale(0.985294)"/>
                            <rect width="68" height="60.8955" fill="black" fill-opacity="0" transform="scale(0.985294)"/>
                            <rect width="68" height="60.8955" fill="black" fill-opacity="0" transform="scale(0.985294)"/>
                            <path d="M64.4421 8.79432L23.4078 0.0700863C21.6717 -0.298913 19.9509 0.826344 19.5836 2.57049L18.8041 7.60362L66.1507 17.6693L66.9303 12.6362C67.2976 10.8927 66.1782 9.16343 64.4421 8.79432Z"/>
                            <path d="M47.186 18.7368C46.7067 17.0027 44.9029 15.9778 43.1774 16.4585L35.3876 18.6311L17.0236 14.7266L15.004 24.3134L2.38511 27.8321C0.659739 28.3129 -0.360485 30.1251 0.118042 31.8585L7.2295 57.6036C7.7088 59.337 9.51266 60.3626 11.238 59.8812L52.0304 48.5084C53.7557 48.0269 54.776 46.2154 54.2974 44.4813L53.0767 40.0617L57.6517 41.0334C59.3878 41.403 61.1086 40.2778 61.4759 38.5336L64.3704 24.7924L47.8911 21.2891L47.186 18.7368ZM51.8969 31.8215L52.9057 27.0314C53.0573 26.3142 53.7651 25.8516 54.4789 26.003L59.2469 27.0172C59.9615 27.1694 60.4219 27.8798 60.2712 28.5977L59.2624 33.3878C59.1108 34.105 58.4031 34.5682 57.6892 34.4161L52.9212 33.4026C52.206 33.2498 51.7454 32.5387 51.8969 31.8215ZM3.09496 30.4012L14.3838 27.255L41.0196 19.8291L43.8859 19.0291C43.9382 19.0149 43.9904 19.0082 44.0414 19.0082C44.2713 19.0082 44.5462 19.1598 44.6266 19.45L44.9631 20.6676L46.0175 24.4845L4.06691 36.1798L2.67599 31.146C2.58885 30.8302 2.78065 30.4888 3.09496 30.4012ZM51.7394 45.1937C51.793 45.389 51.7367 45.5506 51.6797 45.6516C51.6234 45.7526 51.5148 45.8847 51.3204 45.9385L10.5288 57.3113C10.4773 57.3255 10.4243 57.3328 10.3733 57.3328C10.1434 57.3328 9.86847 57.1806 9.78811 56.8904L5.64021 41.8737L47.5908 30.1776L50.1494 39.4393L51.7394 45.1937Z"/>
                            <path d="M17.12 46.2212C16.9243 45.5141 16.1895 45.0966 15.4857 45.2926L10.7218 46.6212C10.0186 46.8172 9.60237 47.556 9.79812 48.2631L11.12 53.0484C11.3157 53.7555 12.0504 54.173 12.7542 53.9764L17.5182 52.6484C18.222 52.4524 18.6376 51.7137 18.4425 51.0066L17.12 46.2212Z"/>
                        </svg>
                    </span>
                </div>
                <div class="text-feat">
                    <div class="features-main-text"><?php echo $features[ 'item' ][2][ 'head' ] ?></div>
                    <p><?php echo $features[ 'item' ][2][ 'text' ] ?></p>
                </div>
            </div>
            <div class="feature col-xl-3 col-md-6 col-sm-6">
                <div class="img-feat">
                    <span>
                        <svg width="55" height="75" viewBox="0 0 55 75" fill="<?php echo cz( 'features_icon_color' ) ?>" xmlns="http://www.w3.org/2000/svg">
                            <rect width="56" height="76" fill="black" fill-opacity="0" transform="scale(0.982143)"/>
                            <rect width="56" height="76" fill="black" fill-opacity="0" transform="scale(0.982143)"/>
                            <path d="M44.5161 22.0202C34.0394 28.4779 26.4881 36.6337 23.4221 40.2582L15.5499 34.0572C15.3414 33.9065 11.02 37.7641 11.1348 37.8842L25.4715 52.5401C25.5769 52.6602 25.7221 52.7144 25.8791 52.7144C25.9072 52.7144 25.9517 52.7144 25.9892 52.705C26.1765 52.6626 26.3358 52.5354 26.4061 52.347C28.7155 46.4097 36.3418 33.9795 46.0807 24.9641C46.254 24.7993 46.3149 24.5402 46.2189 24.3165C46.2166 24.3141 44.6613 21.9307 44.5161 22.0202Z"/>
                            <path d="M53.9179 9.04833C32.2102 9.04833 28.5376 0.763056 28.5048 0.685337C28.3455 0.280258 27.9521 0.00942044 27.507 0C27.507 0 27.4977 0 27.4883 0C27.0573 0 26.6591 0.270838 26.4858 0.666496C26.4601 0.753635 22.7078 9.04833 1.08211 9.04833C0.477813 9.04833 0 9.54055 0 10.134V47.26C0 62.4575 25.9612 74.0682 27.0597 74.5557C27.2049 74.6193 27.3431 74.6429 27.5 74.6429C27.6429 74.6429 27.7975 74.6193 27.9357 74.5557C29.0435 74.0682 55 62.4575 55 47.26V10.134C54.9953 9.54055 54.5152 9.04833 53.9179 9.04833ZM49.0273 45.1004C49.0273 56.9913 28.7016 66.0891 27.8373 66.4659C27.7319 66.5201 27.6077 66.5389 27.4977 66.5389C27.3782 66.5389 27.2681 66.5201 27.1557 66.4659C26.3008 66.0891 5.96798 56.9913 5.96798 45.1004V16.0407C5.96798 15.572 6.34507 15.1857 6.81586 15.1857C23.7478 15.1857 26.6826 8.69507 26.7107 8.63148C26.8442 8.31825 27.1534 8.10629 27.493 8.10629C27.4977 8.10629 27.507 8.10629 27.507 8.10629C27.8537 8.111 28.1605 8.32296 28.2846 8.64561C28.3128 8.70449 31.189 15.1857 48.1795 15.1857C48.6502 15.1857 49.025 15.572 49.025 16.0407L49.0273 45.1004Z"/>
                        </svg>
                    </span>
                </div>
                <div class="text-feat">
                    <div class="features-main-text"><?php echo $features[ 'item' ][3][ 'head' ] ?></div>
                    <p><?php echo $features[ 'item' ][3][ 'text' ] ?></p>
                </div>
            </div>
        </div>
    </div>

<?php endif; ?>