<?php

namespace Orkestra\EaSortable;

use Orkestra\EaSortable\DependencyInjection\OrkestraEaSortableExtension;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class OrkestraEaSortableBundle extends Bundle
{
    public function getContainerExtension()
    {
        return new OrkestraEaSortableExtension();
    }
}