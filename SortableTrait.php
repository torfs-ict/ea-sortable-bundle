<?php

namespace Orkestra\EaSortable;

use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;

trait SortableTrait
{
    /**
     * @var int
     * @ORM\Column(type="integer")
     * @Gedmo\SortablePosition()
     */
    #[ORM\Column(type: Types::INTEGER)]
    #[Gedmo\SortablePosition]
    private $position = 0;

    /**
     * @return int
     */
    public function getPosition(): int
    {
        return $this->position;
    }

    /**
     * @param int $position
     * @return $this
     */
    public function setPosition(int $position): self
    {
        $this->position = $position;
        return $this;
    }
}